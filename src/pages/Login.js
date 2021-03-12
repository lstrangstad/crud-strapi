import { loginSchema } from "../utils/schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL, AUTH_PATH } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(null);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [, setAuth] = useContext(AuthContext);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(`${BASE_URL}${AUTH_PATH}`, data);
      console.log("response", response.data);
      setAuth(response.data);
      setSuccess(true);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      {loginError && <p>{loginError}</p>}
      <fieldset className="login__fieldset" disabled={submitting}>
        {success ? (
          <p className="login__success">Successfully logged in</p>
        ) : null}
        <div className="login__input-box">
          <input
            className="login__input"
            name="identifier"
            placeholder="Username"
            ref={register}
          />
          {errors.identifier && <p>{errors.identifier.message}</p>}
        </div>

        <div className="login__input-box">
          <input
            className="login__input"
            name="password"
            placeholder="Password"
            ref={register}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button className="login__button" type="submit">
          {submitting ? "Loggin in..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
