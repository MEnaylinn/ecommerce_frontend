import Product from "./Product";

const ProductList = ({ products }) => {
  return (
      
        <div className="row row-cols-1 row-cols-md-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
    
  );
};

export default ProductList;
