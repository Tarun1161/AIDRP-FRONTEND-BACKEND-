const BASE = import.meta.env.VITE_API_BASE;

let token = localStorage.getItem("aidrp_token") || "";
let role = localStorage.getItem("aidrp_role") || "";
let username = localStorage.getItem("aidrp_user") || "";

export function setAuth(t, r, u) {
  token = t;
  role = r;
  username = u;
  localStorage.setItem("aidrp_token", t);
  localStorage.setItem("aidrp_role", r);
  localStorage.setItem("aidrp_user", u);
}

export function clearAuth() {
  token = "";
  role = "";
  username = "";
  localStorage.removeItem("aidrp_token");
  localStorage.removeItem("aidrp_role");
  localStorage.removeItem("aidrp_user");
}

async function req(path, opts = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {})
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...opts, headers });

  if (!res.ok) throw new Error(await res.text());

  return res.json();
}

export const api = {
  login: (u, p) =>
    req("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: u, password: p })
    }),

  alerts: () => req("/alerts"),
  createAlert: (data) =>
    req("/alerts", { method: "POST", body: JSON.stringify(data) }),
  closeAlert: (id) => req(`/alerts/${id}/close`, { method: "POST" }),

  resources: () => req("/resources"),
  createResource: (d) =>
    req("/resources", { method: "POST", body: JSON.stringify(d) }),

  predictions: () => req("/predictions")
};
