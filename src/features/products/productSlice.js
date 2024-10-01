import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { imagePath, productPath } from "../../config/pathConfig";



export const fetchAllProducts = createAsyncThunk("fetchAllProducts",async() => {
    try{
    const response=await axios.get(`${productPath}/all`)
    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.error(error)
}
})

export const fetchAllCategory = createAsyncThunk("fetchAllCategory",async() => {
    try{
    const response=await axios.get(`${productPath}/category`)
    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.error(error)
}
});

export const postNewProduct = createAsyncThunk("postNewProduct",async(data) => {
    try{
    const response=await axios.post(`${productPath}/create`,data.product,{
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : data.token
        }
    });

    if(response.status === 201 && data.formData.has("file")){
        const uploadResponse = await axios.post(`${imagePath}/upload/${response.data.id}`,data.formData,{
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization' : data.token
            }
        })
        if(uploadResponse.status === 200){
                console.log(uploadResponse.data)
        }else{
                console.log("image upload failed")
        }
    }
    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.error(error)
}
});

export const putProduct = createAsyncThunk("putProduct",async(data) => {
    try{
    const response=await axios.put(`${productPath}/update`,data.product,{
        headers : {
            'Content-Type': 'application/json',
            'Authorization' : data.token
        }
    });

    if(response.status === 200 && data.formData.has("file")){
        const uploadResponse = await axios.post(`${imagePath}/upload/${response.data.id}`,data.formData,{
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization' : data.token
            }
        })
        if(uploadResponse.status === 200){
                console.log(uploadResponse.data)
        }else{
                console.log("image upload failed")
        }
    }
    return {
        statusCode : response.status,
        data : response.data
    }

}catch(error){
    console.error(error)
}
});

export const deleteProduct = createAsyncThunk("deleteProduct",async(data) => {
    try{
    const response=await axios.delete(`${productPath}/${data.productId}/delete`,{
        headers : {
            'Authorization' : data.token
        }
    })
    return {
        statusCode : response.status,
        data : response.data
    }
}catch(error){
    console.error(error)
}
});


const initialState={
    products : [],
    categories : [],
    status : "idle",
    error : null
}

const productSlice=createSlice({
    name : "productSlice",
    initialState,
    reducers : {},
    extraReducers(builder){
        builder
            .addCase(fetchAllProducts.fulfilled,(state,action) => {
                const response=action.payload
                
                if(response?.statusCode){
                    const {statusCode,data}=response;
                if(statusCode === 200){
                    console.log('fetchallproduct success')
                    state.products = [...data];
                    state.status = "success"
                }

                if(statusCode === 404){
                    state.status = "failed"
                    state.error = String(data)
                }
            }else{
                console.log("error occured in fetchallproducts")
            }
            })
            .addCase(postNewProduct.fulfilled,(state,action) => {
                const response=action.payload
                
                if(response?.statusCode){
                    const {statusCode,data}=response;
                if(statusCode === 201){
                    state.status='idle'
                    state.products = [...state.products,data];
                }

                if(statusCode === 404){
                    state.status = "failed"
                    state.error = String(data)
                }
            }else{
                console.log("error occured in postProduct")
            }
            })
            .addCase(putProduct.fulfilled,(state,action) => {
                const response=action.payload
                
                if(response?.statusCode){
                    const {statusCode,data}=response;
                if(statusCode === 200){
                    state.status='idle'
                    state.products = [data,state.products.filter(product => product.id !== Number(data.id))]
                }

                if(statusCode === 404){
                    state.status = "failed"
                    state.error = String(data)
                    console.log('error occur in 404')
                }
            }else{
                console.log("error occured in putProduct")
            }
            })
            .addCase(fetchAllProducts.pending,(state,action)=>{
                state.status = "loading"
            })
            .addCase(fetchAllProducts.rejected,(state,action) =>{
                state.status = "Failed"
                state.error = action.payload
            })
            .addCase(fetchAllCategory.fulfilled,(state,action)=>{
                const response=action.payload
                
                if(response?.statusCode){
                    const {statusCode,data}=response;
                if(statusCode === 200){
                    state.categories = [...data];
                }
            }else{
                console.log("error occured in fetchAllCategory")
            }
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            const response=action.payload
            
            if(response?.statusCode){
                const {statusCode,data}=response;
            if(statusCode === 200){
                state.status='idle'
                state.products = [state.products.filter(product => product.id !== Number(data))]
            }

            if(statusCode === 404){
                state.status = "failed"
                state.error = String(data)
                console.log('error occur in 404')
            }
        }else{
            console.log("error occured in putProduct")
        }
        
        })
    }

})
export default productSlice.reducer
export const getAllProducts = state =>state.products.products
export const getProductById = (state,productId) => state.products.products.find(product => product.id === Number(productId) )
export const getStatus = state => state.products.status
export const getError = state => state.products.error
export const getAllCategories= state => state.products.categories
