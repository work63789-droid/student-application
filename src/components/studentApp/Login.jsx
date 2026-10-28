import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./student.css";

// Turn Firebase error codes into simple messages
const getErrorMessage = (code) => {
  if (code === "auth/invalid-credential") return "Wrong email or password";
  if (code === "auth/invalid-email") return "Please enter a valid email";
  if (code === "auth/too-many-requests") return "Too many tries. Wait a bit";
  if (code === "auth/operation-not-allowed")
    return "Email/Password login is not enabled in Firebase";
  return "Login failed. Try again";
};

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in? Go to the students page
  if (user) return <Navigate to="/students" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate("/students");
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
    setSubmitting(false);
  };

  return (
    <div className="student-page">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;
