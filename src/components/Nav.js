import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Nav = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const history = useHistory();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <nav className="nav">
      <Link className="nav__link" to="/">
        Home
      </Link>
      {auth ? (
        <>
          |{" "}
          <Link className="nav__link" to="/products">
            Products
          </Link>{" "}
          |{" "}
          <Link className="nav__link" to="/add">
            Add product
          </Link>{" "}
          |{" "}
          <button className="nav__button" onClick={logout}>
            Log out
          </button>
        </>
      ) : (
        <Link className="nav__link" to="/login">
          Login
        </Link>
      )}
    </nav>
  );
};

export default Nav;
