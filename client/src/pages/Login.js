import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import "./pages.css"; 

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:4000/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      alert("To login user, enter details to proceed...");
    } else {
      fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(form),
      })
      .then((result) => console.log("User login", result))
      .catch((error) => console.log("Something went wrong ", error));
    }
    authCheck();
  };

  return (
    <>
      <div className="login-container">
        <div className="login-image">
          <img src={require("../assets/clothify.png")} alt="Clothify Logo" />
        </div>
        <div className="login-form">
          <h2 className="login-title">Signin to your account</h2>
          <form onSubmit={loginUser}>
            <div className="login-inputs">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-field"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="login-options">
              <label className="checkbox-container">
                <input id="remember-me" name="remember-me" type="checkbox" />
                Remember me
              </label>
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <button type="submit" className="login-button">Sign in</button>
            <p className="register-prompt">
              Don't Have an Account, Please <Link to="/register"> Register now </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
