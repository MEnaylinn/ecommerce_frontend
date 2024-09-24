import { Link } from "react-router-dom";
import { imagePath } from "../config/pathConfig";
import { useDispatch, useSelector } from "react-redux";

import { getLoginStatus, getRole, getToken, getUser } from "../auths/authSlice";
import { addCartItem } from "../cart/cartItemSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginStatus);
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const role = useSelector(getRole);

  const addProductToCart = (e) => {
    e.preventDefault();

    if (loginStatus && token) {
      dispatch(
        addCartItem({
          productId: Number(product.id),
          username: String(user.username),
          token: String(token),
        })
      );
    } else {
      console.log("No user account");
    }
  };
  console.log("role admin is " + role);
  console.log(`${role}` === "role_admin");

  return (
    <div className="col position-relative">
      <div className="card">
        <img
          src={`${imagePath}/${product.id}.jpg`}
          className="card-img-top"
          style={{maxHeight : 200 +'px', minHeight : 200 + 'px'}}
          alt={product.name}
        />
        <div className="card-body">
          <div className="card-title fs-6 fw-bold overflow-hidden" style={{maxHeight : 50 +'px', minHeight:50 +"px"}}>{product.name}</div>
          {/* <div className="card-text overflow-hidden" style={{maxHeight : 100 +'px'}}>{product.description}</div> */}
          <div className="row row-cols md-2 mt-2">
            <div className="col">{product.price} $</div>
            {/* <p>{disVal}</p> */}
            {/* <p>{`${product.discountPercent}%`}</p> */}
            <div className="col text-end">{product.discountPercent}% OFF</div>
          </div>
          <div className="row g-2 py-2 text-end">
            <Link
              to={`/product/update/${product.id}`}
              className="btn btn-primary"
              hidden={`${role}` === "ROLE_ADMIN" ? false : true}
            >
              Edit Item
            </Link>
            <button onClick={addProductToCart} className="btn btn-primary">
              Add Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
