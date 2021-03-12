import { useParams, useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useState, useEffect, useContext } from "react";
import Item from "../components/Item";
import { PRODUCTS_PATH } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../utils/schemas";
import AuthContext from "../context/AuthContext";

const EditProduct = () => {
  const [auth] = useContext(AuthContext);
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const http = useAxios();
  const [submitting, setSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setUpdateError(null);

    console.log(data);

    try {
      const response = await http.put(`${PRODUCTS_PATH}/${id}`, data);
      console.log("response", response.data);
      setProduct(response.data);
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await http.get(`${PRODUCTS_PATH}/${id}`);
        console.log(response);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  if (!auth) {
    history.push("/login");
  }

  return (
    <>
      <h1 className="edit__heading">Edit Product</h1>
      <div className="edit">
        <Item {...product} />
        <form className="edit__form" onSubmit={handleSubmit(onSubmit)}>
          {updateError && <p className="edit_error">{updateError}</p>}
          <fieldset className="edit__fieldset" disabled={submitting}>
            <div className="edit__input-box">
              <input
                className="edit__input"
                name="title"
                placeholder="Title"
                ref={register}
                defaultValue={product.title}
              />
              {errors.title && (
                <p className="edit_error">{errors.title.message}</p>
              )}
            </div>

            <div className="edit__input-box">
              <input
                className="edit__input"
                name="price"
                placeholder="Price"
                defaultValue={product.price}
                ref={register}
                type="number"
              />
              {errors.price && (
                <p className="edit_error">{errors.price.message}</p>
              )}
            </div>
            <div className="edit__input-box">
              <textarea
                className="edit__textarea"
                name="description"
                placeholder="Description"
                defaultValue={product.description}
                ref={register}
                type="text"
              />
              {errors.description && (
                <p className="edit_error">{errors.description.message}</p>
              )}
            </div>
            <div className="edit__input-box">
              <input
                className="edit__input"
                name="image_url"
                placeholder="Image URL"
                ref={register}
                defaultValue={product.image_url}
                type="text"
              />
              {errors.image_url && (
                <p className="edit_error">{errors.image_url.message}</p>
              )}
            </div>

            <button className="edit__button button" type="submit">
              {submitting ? "Updating ..." : "Update"}
            </button>
          </fieldset>
        </form>
        {success ? <p>Listing of {product.title} was updated</p> : null}
      </div>
    </>
  );
};

export default EditProduct;
