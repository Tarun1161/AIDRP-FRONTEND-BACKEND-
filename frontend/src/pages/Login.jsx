import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuth } from "../api";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const r = await api.login(username, password);
      setAuth(r.access_token, r.role, r.username);
      nav("/");
    } catch (err) {
      setError("Invalid login");
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
        <h2>Login</h2>

        <form onSubmit={submit}>
          <div style={{ display: "grid", gap: 8 }}>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <div style={{ color: "red" }}>{error}</div>}

            <button className="btn" type="submit">
              Sign in
            </button>
          </div>
        </form>

        <p style={{ opacity: 0.7, marginTop: 10 }}>
          Try admin/admin123 · responder/resp123 · analyst/analyst123
        </p>
      </div>
    </div>
  );
}
