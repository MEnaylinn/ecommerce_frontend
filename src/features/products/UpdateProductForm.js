import classes from './UpdateProductForm.module.css'
import {  useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchAllCategory, getAllCategories, getProductById, putProduct } from './productSlice'
import Card from '../../components/ui/Card'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getToken } from '../auths/authSlice'

const UpdateProductForm = () => {
    const {productId}=useParams()
    const categories=useSelector(getAllCategories)
    const navigate=useNavigate()
    const exitededProduct = useSelector((state) => getProductById(state,productId))

    const [name,setName]=useState(exitededProduct?.name)
    const [code,setCode]=useState(exitededProduct?.code)
    const [category,setCategory]=useState(exitededProduct?.category)
    const [quantity,setQuantity]=useState(exitededProduct?.quantity)
    const [price,setPrice]=useState(exitededProduct?.price)
    const [discountPercent,setDiscountPercent]=useState(exitededProduct?.discountPercent)
    const [description,setDescription]=useState(exitededProduct?.description)
    const [image,setImage]=useState(exitededProduct?.image)
    const [review,setReview]=useState(exitededProduct?.review)

    const [requestStatus,setRequestStatus]=useState('idle')
    
    const renderedOptions = categories.map(category =>
        <option
            key={category}
            value={category}
        >
            {String(category).toLocaleLowerCase()}

        </option>
    )

    const dispatch=useDispatch()
    const token = useSelector(getToken) 

    useEffect(()=>{
        dispatch(fetchAllCategory(token))
    },[token,dispatch])

    const onNameChange = e => setName(e.target.value)
    const onCodeChange = e => setCode(e.target.value)
    const onCategoryChange = e => setCategory(e.target.value)
    const onQuantityChange = e => setQuantity(e.target.value)
    const onPriceChange = e => setPrice(e.target.value)
    const onDiscountPercentChange = e => setDiscountPercent(e.target.value)
    const onImageChange = e => setImage(e.target.files[0])
    const onReviewChange = e => setReview(e.target.value)
    const onDescriptionChange = e => setDescription(e.target.value)
    
    const canCreate=[name,code,category,quantity,price,discountPercent,image,review,description].every(Boolean) && requestStatus === 'idle' 

    const onSubmit= (e)=>{
        e.preventDefault()

        if(canCreate && token){
            setRequestStatus('pending')
            const formData = new FormData()
            formData.append("file", image)

            dispatch(putProduct({
               product : {
                id : exitededProduct?.id,
                name,
                code,
                category,
                price,
                quantity,
                discountPercent,
                review,
                description},
                token : String(token),
                formData
            }))
            navigate('/')
        }
    }
    const onDelete= (e)=>{
        e.preventDefault()

        if(productId && token){
            dispatch(deleteProduct(
               { 
                productId,
                token : String(token)
            }
            ))
        }
        navigate('/')
    }
    
  return (
    <section>
        <h1>Product Update</h1>
        <Card>
    <form className={classes.form}>
        <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input 
                type='text' 
                id='name' 
                required
                value={name}
                onChange={onNameChange}
            />
        </div>

        <div className={classes.control}>
            <label htmlFor='image'>Image</label>
            <input 
                type='file' 
                id='image' 
                required
                onChange={onImageChange}
            />
        </div>

        <div className={classes.control}>
            <label htmlFor='code'>Code</label>
            <input 
                type='text' 
                id='code' 
                required
                value={code}
                onChange={onCodeChange}
            />
        </div>

        <div className={classes.control}>
            <label htmlFor='category'>Category</label>
            <select 
            id='category'
            required
            value={category}
                onChange={onCategoryChange}
            >
                {renderedOptions}
            </select>
        </div>

        <div className={classes.control}>
            <label htmlFor='quantity'>Quantity</label>
            <input 
                type='number' 
                id='quantity' 
                required
                value={quantity}
                onChange={onQuantityChange}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='price'>Price</label>
            <input 
                type='number' 
                id='price' 
                required
                value={price}
                onChange={onPriceChange}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='discountPercent'>Discount Percent</label>
            <input 
                type='number' 
                id='discountPercent' 
                required
                value={discountPercent}
                onChange={onDiscountPercentChange}
            />
        </div>
        <div className={classes.control}>
            <label htmlFor='review'>Review</label>
            <input 
                type='number' 
                id='review' 
                required
                value={review}
                onChange={onReviewChange}
            />
        </div>

        <div className={classes.control}>
            <label htmlFor='description'>Description</label>
            <textarea 
                id='description'
                rows='10'
                required
                value={description}
                onChange={onDescriptionChange}
            />
        </div>

        <div className={classes.actions}>
            <button onClick={onDelete} disabled = {!canCreate}>Delete</button>
            <button onClick={onSubmit} disabled = {!canCreate}>Update</button>
        </div>
    </form>
    </Card>
    </section>
    
)
}


export default UpdateProductForm