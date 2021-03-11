import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Nav from "./components/Nav";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/products" component={Products} />
          <Route path="/edit/:id" component={EditProduct} />
          <Route path="/add" component={AddProduct} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
