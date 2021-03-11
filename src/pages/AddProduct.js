import { useParams, useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { useState, useContext } from "react";
import { PRODUCTS_PATH } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../utils/schemas";
import AuthContext from "../context/AuthContext";
import Item from "../components/Item";

const AddProduct = () => {
  const [auth] = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const http = useAxios();
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setPostError(null);

    console.log(data);

    try {
      const response = await http.post(`${PRODUCTS_PATH}`, data);
      console.log("response", response.data);
      setProduct(response.data);
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  if (!auth) {
    history.push("/login");
  }

  return (
    <div>
      <h1>Add product</h1>
      {}
      <form onSubmit={handleSubmit(onSubmit)}>
        {postError && <p>{postError}</p>}
        <fieldset disabled={submitting}>
          <div>
            <input name="title" placeholder="Title" ref={register} />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <input
              name="price"
              placeholder="Price"
              ref={register}
              type="number"
            />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              ref={register}
              type="text"
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <input
              name="image_url"
              placeholder="Image URL"
              ref={register}
              type="text"
            />
            {errors.image_url && <p>{errors.image_url.message}</p>}
          </div>

          <button type="submit">
            {submitting ? "Updating ..." : "Update"}
          </button>
        </fieldset>
      </form>
      {success ? <p>Listing of {product.title} was added</p> : null}
      {success ? <Item {...product} /> : null}
    </div>
  );
};

export default AddProduct;
