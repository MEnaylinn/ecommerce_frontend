import Product from "./Product";

const ProductList = ({ products }) => {
  return (
      
        <div className="row row-cols-1 row-cols-lg-4 position-relative">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
    
  );
};

export default ProductList;
