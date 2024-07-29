import { Link } from "react-router-dom";
import { imagePath } from "../config/pathConfig";
import { useDispatch, useSelector } from "react-redux";

import { getLoginStatus, getToken, getUser } from "../auths/authSlice";
import { addCartItem } from "../cart/cartItemSlice";

const Product = ({ product }) => {
    const dispatch = useDispatch()  
    const loginStatus = useSelector(getLoginStatus)
    const token = useSelector(getToken)
    const user = useSelector(getUser)
    

  const addProductToCart=(e)=>{
    e.preventDefault()
    
      if(loginStatus && token){
       dispatch(addCartItem({
         productId : Number(product.id),
         username : String(user.username),
         token : String(token)
         
       }))
    }else{
      console.log('No user account')
    }
     
  }
     

  return (
    <div className="col">
    <div className="card">
      <img
        src={`${imagePath}/${product.id}.jpg`}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <div className="row row-cols-md-2">
          <p>{product.price}</p>
          {/* <p>{disVal}</p> */}
          <p>{`${product.discountPercent}%`}</p>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-1 py-2">
        <button onClick={addProductToCart} className="btn btn-primary">
            Add Cart
          </button>
          <Link to={`/product/update/${product.id}`} className="btn btn-primary">
            Edit Item
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Product;
