import "../styles/Login.css";
import type {FC} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countryCodes } from "../Constants/CountryCode";

const Register: FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    countryCode: "",
    mobile: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.countryCode) newErrors.countryCode = "Country code is required";
    if (!form.mobile) newErrors.mobile = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Register payload:", form);
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <form className="auth-left" onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          {/* Username */}
          <div className="input-group">
            <label>Username</label>
            <input
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
            {errors.username && <div className="error-text">{errors.username}</div>}
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>

          {/* Country Code Dropdown */}
          <div className="input-group">
            <label>Country Code</label>
            <select
              value={form.countryCode}
              onChange={(e) =>
                setForm({ ...form, countryCode: e.target.value })
              }
            >
              <option value="">Select country code</option>
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <div className="error-text">{errors.countryCode}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />
            {errors.mobile && <div className="error-text">{errors.mobile}</div>}
          </div>

          <button className="login-btn" type="submit">
            Sign Up
          </button>

          <div className="signup-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
