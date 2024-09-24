import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  getAllCategories,
  postNewProduct,
} from "./productSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../auths/authSlice";

const NewProductForm = () => {
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();
  const token = useSelector(getToken);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("ELECTRONIC");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [review, setReview] = useState(0);
  const [requestStatus, setRequestStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState("");

  const renderedOptions = categories.map((category) => (
    <option key={category} value={category}>
      {String(category).toLocaleLowerCase()}
    </option>
  ));

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(fetchAllCategory(token));
    } else {
      console.log("token is empty");
    }
  }, [token, dispatch]);

  const onNameChange = (e) => setName(e.target.value);
  const onCodeChange = (e) => setCode(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);
  const onQuantityChange = (e) => setQuantity(e.target.value);
  const onPriceChange = (e) => setPrice(e.target.value);
  const onDiscountPercentChange = (e) => setDiscountPercent(e.target.value);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    console.log(image.pathname);
    if (file) {
      // Create a URL for the image file
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      console.log(url);

      // // Clean up the object URL when the component unmounts
      // return () => URL.revokeObjectURL(url);
    }
  };
  const onReviewChange = (e) => setReview(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);

  const canCreate =
    [
      name,
      code,
      category,
      quantity,
      price,
      discountPercent,
      image,
      review,
      description,
    ].every(Boolean) && requestStatus === "idle";

  const onSubmit = (e) => {
    e.preventDefault();

    if (canCreate) {
      setRequestStatus("pending");
      const formData = new FormData();
      formData.append("file", image);

      dispatch(
        postNewProduct({
          product: {
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
      setRequestStatus("idle");
      setName("");
      setCode("");
      setCategory("ELECTRONIC");
      setImage("");
      setQuantity(0);
      setDiscountPercent(0);
      setReview(0);
      setDescription("");
      setPrice(0.0);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="card col-12 col-md-6 m-auto my-2">
        <div className="fs-4 fw-bold mb-5">New Product Form</div>
        <form className="form">
          <div className="mb-3 text-center">
            <img src={imageUrl} alt="" className="card-img-top w-75 mb-2" />
            <input type="file" id="image" required onChange={onImageChange} />
          </div>
          <div className="mb-3">
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
              id="review"
              className="form-control"
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

          <div className="mb-3 text-end">
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={!canCreate}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProductForm;
