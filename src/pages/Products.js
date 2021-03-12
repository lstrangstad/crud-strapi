import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { PRODUCTS_PATH } from "../utils/constants";
import Item from "../components/Item";

const Products = () => {
  const [auth] = useContext(AuthContext);
  const [products, setProducts] = useState(null);
  const [render, setRender] = useState(0);
  const http = useAxios();
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await http.get(PRODUCTS_PATH);
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [render]);

  const deleteProduct = async (id, productTitle) => {
    try {
      const response = await http.delete(`${PRODUCTS_PATH}/${id}`);
      console.log(response);
      alert(`${productTitle} has been deleted.`);
    } catch (error) {
      console.log(error);
    } finally {
      setRender(render + 1);
    }
  };

  if (!products) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1 className="container__heading">Products</h1>
      <div className="container">
        {products.map((product) => {
          return (
            <div className="container__card" key={product.id}>
              <Link className="container__link" to={`/edit/${product.id}`}>
                <Item {...product} />
              </Link>
              <button
                className="container__button button"
                onClick={() => deleteProduct(product.id, product.title)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
