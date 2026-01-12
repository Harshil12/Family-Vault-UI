import "../styles/login.css";
import LoginImage from "../assets/Login.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Welcome Back</h1>

          <div className="input-group">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" />
          </div>

          <button className="login-btn" onClick={() => navigate("/families")}>Login</button>

          <div className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </div>
        </div>

        <div className="auth-right">
          <img src={LoginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
