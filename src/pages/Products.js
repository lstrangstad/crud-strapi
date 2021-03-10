import { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { PRODUCTS_PATH } from "../utils/constants";
import Item from "../components/Item";

const Products = () => {
  const [auth] = useContext(AuthContext);
  const [products, setProducts] = useState(null);
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
  }, []);

  if (!products) {
    return <p>loading...</p>;
  }

  return (
    <>
      <h1>Products</h1>
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/edit/${product.id}`}>
            <Item {...product} />;
          </Link>
        );
      })}
    </>
  );
};

export default Products;
