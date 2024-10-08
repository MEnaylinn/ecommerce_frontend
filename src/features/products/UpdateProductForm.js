import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAllCategory,
  getAllCategories,
  getProductById,
  putProduct,
} from "./productSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../auths/authSlice";
import { imagePath } from "../../config/pathConfig";

const UpdateProductForm = () => {
  const { productId } = useParams();
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const exitededProduct = useSelector((state) =>
    getProductById(state, productId)
  );

  const [name, setName] = useState(exitededProduct?.name);
  const [code, setCode] = useState(exitededProduct?.code);
  const [category, setCategory] = useState(exitededProduct?.category);
  const [quantity, setQuantity] = useState(exitededProduct?.quantity);
  const [price, setPrice] = useState(exitededProduct?.price);
  const [discountPercent, setDiscountPercent] = useState(
    exitededProduct?.discountPercent
  );
  const [description, setDescription] = useState(exitededProduct?.description);
  const [image, setImage] = useState("");
  const [review, setReview] = useState(exitededProduct?.review);

  const [requestStatus, setRequestStatus] = useState("idle");

  console.log(exitededProduct);

  const renderedOptions = categories.map((category) => (
    <option key={category} value={category}>
      {String(category).toLocaleLowerCase()}
    </option>
  ));

  const dispatch = useDispatch();
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(fetchAllCategory(token));
  }, [token, dispatch]);

  const onNameChange = (e) => setName(e.target.value);
  const onCodeChange = (e) => setCode(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);
  const onQuantityChange = (e) => setQuantity(e.target.value);
  const onPriceChange = (e) => setPrice(e.target.value);
  const onDiscountPercentChange = (e) => setDiscountPercent(e.target.value);

  const onReviewChange = (e) => setReview(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const [imageUrl, setImageUrl] = useState("");

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    if (file) {
      // Create a URL for the image file
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      console.log("image url is " + url);

      // // Clean up the object URL when the component unmounts
      // return () => URL.revokeObjectURL(url);
    }
  };

  const canCreate =
    [
      name,
      code,
      category,
      quantity,
      price,
      discountPercent,
      review,
      description,
    ].every(Boolean) && requestStatus === "idle";

  const onSubmit = (e) => {
    e.preventDefault();

    if (canCreate && token) {
      setRequestStatus("pending");

      const formData = new FormData();

      if (image) {
        formData.append("file", image);
      }

      dispatch(
        putProduct({
          product: {
            id: exitededProduct?.id,
            name,
            code,
            category,
            price,
            quantity,
            discountPercent,
            review,
            description,
          },
          token: String(token),
          formData,
        })
      );
      navigate("/");
    }
  };

  const onDelete = (e) => {
    console.log("deleting...");
    if (productId && token) {
      dispatch(
        deleteProduct({
          productId,
          token: String(token),
        })
      );
    }
    navigate("/");
  };

  return (
    <section>
      <div className="card col-12 col-md-6 m-auto my-2">
        <div className="fs-5 fw-bold text-center"> Product Updating</div>
        <form>
          <div className="mb-3 text-center">
            <img
              src={
                imageUrl ? imageUrl : `${imagePath}/${exitededProduct.id}.jpg`
              }
              alt=""
              className="card-img-top w-75 mb-2"
            />
            <input type="file" id="image" required onChange={onImageChange} />
          </div>

          <div className="mb-3 gap-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              required
              value={name}
              onChange={onNameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              type="text"
              id="code"
              className="form-control"
              required
              value={code}
              onChange={onCodeChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              className="form-control"
              required
              value={category}
              onChange={onCategoryChange}
            >
              {renderedOptions}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              required
              value={quantity}
              onChange={onQuantityChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="form-control"
              required
              value={price}
              onChange={onPriceChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discountPercent" className="form-label">
              Discount Percent
            </label>
            <input
              type="number"
              id="discountPercent"
              className="form-control"
              required
              value={discountPercent}
              onChange={onDiscountPercentChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Review
            </label>
            <input
              type="number"
              className="form-control"
              id="review"
              required
              value={review}
              onChange={onReviewChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              rows="10"
              className="form-control"
              required
              value={description}
              onChange={onDescriptionChange}
            />
          </div>

          <div className="text-end">
            <button
              className="btn btn-danger mx-2"
              onClick={onDelete}
              disabled={!canCreate}
            >
              Delete
            </button>
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={!canCreate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProductForm;
