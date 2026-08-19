import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextValue";

export default function Login() {
  const { login } = useContext(AppContext);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = login(username, password);
    if (res.ok) {
      navigate("/");
    } else {
      setError(res.error || "Failed");
    }
  }

  return (
    <div className="center-screen">
      <div className="card auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button className="btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <p style={{ marginTop: 12, color: "#666" }}>
          Demo creds: <strong>admin / admin123</strong>
        </p>
      </div>
    </div>
  );
}
