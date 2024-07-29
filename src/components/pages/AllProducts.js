import React, { useEffect } from 'react'
import ProductList from '../../features/products/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, getAllProducts, getError, getStatus } from '../../features/products/productSlice'


const AllProducts = () => {
  const status = useSelector(getStatus)
  
  const dispatch=useDispatch()

  
  useEffect(()=>{
      if(status === 'idle'){
          dispatch(fetchAllProducts())
      }
  },[status,dispatch])

  const products=useSelector(getAllProducts)
  const error=useSelector(getError)

  let content = ''
  if(status === 'success'){
      content = <ProductList 
      products={products}
      />
      
  }

  if(status === 'loading'){
      content = 
      <>
      <div className="spinner-border text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </>
  }

  if(status === 'failed'){
      content = {error}
  }

  return (
    <div className='container align-items-center'>
      <h1>All Products</h1>
      {
        content
      }
    </div>
  )
}

export default AllProducts