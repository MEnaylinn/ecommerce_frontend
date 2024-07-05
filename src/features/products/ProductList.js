import Product from './Product'
import classes from './ProductList.module.css'

const ProductList = ({products}) => {
  return ( 
        <ul className={classes.list}>
         {
          products.map(product=><Product
              key={product.id}
              product={product}
            />
          )
         }
        </ul>
)
}

export default ProductList