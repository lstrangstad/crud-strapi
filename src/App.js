import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
