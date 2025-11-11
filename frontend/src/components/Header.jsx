import { NavLink } from "react-router-dom";
import { useAuth } from "../auth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        background: "#111632",
        borderBottom: "1px solid #1f2545"
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <strong>AIDRP</strong>

        <nav style={{ display: "flex", gap: 12 }}>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/alerts">Alerts</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/predictions">Predictions</NavLink>
        </nav>
      </div>

      <div>
        {user?.role ? (
          <>
            <span style={{ marginRight: 12 }}>
              {user.username} · {user.role}
            </span>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink className="btn" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
