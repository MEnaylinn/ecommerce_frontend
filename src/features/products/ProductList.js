import Product from './Product'
// import classes from './ProductList.module.css'

const ProductList = ({products}) => {
  return (
    
        <div className='row'>
          {
          products.map(product=><Product
              key={product.id}
              product={product}
            />
          )
         }
        </div>
)
}

export default ProductList