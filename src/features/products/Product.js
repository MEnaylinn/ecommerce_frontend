import React from 'react'
import Card from '../../components/ui/Card'
import classes from "./Product.module.css"
import { Link } from 'react-router-dom'
import { imagePath } from '../config/pathConfig'


const Product = ({product}) => {
  return (
    <Card>
        <div className={classes.item}>
        <div className={classes.image}>
            <img src={`${imagePath}/${product.id}.jpg`} alt={product.name}/>
        </div>

        <div className={classes.content}>
            <h3>{product.name}</h3>
            <p>{`ProductCode : ${product.code}`}</p>
            <p>{`ProductCategory : ${product.category}`}</p>
            <p>{`ProductQty : ${product.quantity}`}</p>
            <p>{`ProductOriginalPrice : ${product.price}`}</p>
            <p>{`ProductCurrentPrice : ${(product.price)*((100-(product.discountPercent))/100)}`}</p>
            <p>{`ProductReview : ${product.review}`}</p>
            <p>{product.description}</p>
            <p><Link to={`/product/update/${product.id}`}>Edit Product</Link></p>
        </div>
        </div>
    </Card>  )
}

export default Product