import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shippingPath } from "../../config/pathConfig";

export const fetchAllShipping=createAsyncThunk("fetchAllShipping",async(data)=>{
    console.log("fetchAllShipping is :"+ data.token)
    try {
        const response = await axios.get(`${shippingPath}/all`,{
            headers : {
                'Authorization': data.token
            }
        })

        return {
            statusCode : response.status,
            data : response.data
        }
        
    } catch (error) {
        console.error(error)
    }
});

export const addShipping = createAsyncThunk("addShipping",async(data)=>{
    try {
        const response = await axios.post(`${shippingPath}/create`,data.userShippingAddress,{
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : data.token
            }
        })
        
        return {
            statusCode : response.status,
            data : response.data

        }
    } catch (error) {
        console.error(error)
    }
});

export const deleteShipping = createAsyncThunk("deleteShipping",async(data) => {
    try{
    const response=await axios.delete(`${shippingPath}/${data.userShippingAddressId}/delete`,{
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

export const updateShipping = createAsyncThunk("updateShipping",async(data) => {
    try{
    const response=await axios.put(`${shippingPath}/update`,data.userShippingAddress,{
        headers : {
            'Content-Type': 'application/json',
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
    shipping : [],
    defaultShipping :'',
    status :'idle',
    error : ''
}
const shippingSlice = createSlice({
    name : "shippingSlice",
    initialState,
    reducers : {
        setDefaultShipping : (state, action)=>{
            state.defaultShipping = action.payload;
        },
        clearDefaultShipping : (state)=>{
            state.defaultShipping = '';
        }
    },
    extraReducers (builder){
        builder
        .addCase(fetchAllShipping.fulfilled,(state,action)=>{
            const response = action.payload

            if(response?.statusCode){
                const {statusCode,data}=response;
                console.log(statusCode)
                console.log(data)
            if(statusCode === 200){
                state.status = "idle"
                console.log('fetchAllShipping success')
                state.shipping = data;
            }else{
                state.status = "failed"
                state.error = String(data)
                console.log('error occured in Server')
            }
        
            }else{
                console.log('error occured in fetchAllShipping')
            }

        })
        .addCase(addShipping.fulfilled,(state,action)=>{
            const response = action.payload

            if(response?.statusCode){
                const {statusCode,data}=response;
            if(statusCode === 201){
                state.status = "idle"
                console.log('addShipping success')
                state.shipping = [...state.shipping,data];
            }else{
                state.status = "failed"
                state.error = String(data)
                console.log(state.error)
            }
        
            }else{
                console.log('error occured in addShipping')
                console.log(state.error)
            }

        })
        .addCase(deleteShipping.fulfilled,(state,action)=>{
            const response = action.payload

            if(response?.statusCode){
                const {statusCode,data}=response;
            if(statusCode === 200){
                state.status = "idle"
                console.log('deleteShipping success')
                const shippingAddress = state.shipping.filter((ship)=> ship.id !== Number(data))
                state.cartItems = [...shippingAddress]
            }else{
                state.status = "failed"
                state.error = String(data)
                console.log(state.error)
            }
        
            }else{
                console.log('error occured in deleteShipping')
            }

        })
        .addCase(updateShipping.fulfilled,(state,action)=>{
            const response = action.payload

            if(response?.statusCode){
                const {statusCode,data}=response;
            if(statusCode === 200){
                state.status = "idle"
                console.log('updateShipping success')
                console.log(data)
                state.shipping = [...state.shipping.filter((ship)=>ship.id !== Number(data.id)),data]    
            }else{
                state.status = "failed"
                state.error = String(data)
                console.log('updateShipping failed')
                console.log(state.error)
            }
        
            }else{
                console.log('error occured in updateShipping')
            }

        })
    }
})
export default shippingSlice.reducer
export const getAllShipping = (state)=>state.shipping.shipping
export const getShippingById = (state,shippingId)=>state.shipping.shipping.find((ship)=> ship.id === Number(shippingId))
export const getStatus = (state) => state.shipping.status
export const getDefaultShipping = (state) => state.shipping.defaultShipping;
export const getError = (state) => state.shipping.error
export const {setDefaultShipping,clearDefaultShipping} = shippingSlice.actions
