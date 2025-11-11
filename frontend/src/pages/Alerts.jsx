import { useState, useEffect } from "react";
import { api } from "../api";
import AlertsList from "../components/AlertsList";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({
    type: "Flood",
    severity: "high",
    message: "",
    lat: 17.385,
    lng: 78.4867
  });

  useEffect(() => load(), []);

  async function load() {
    setAlerts(await api.alerts());
  }

  async function submit(e) {
    e.preventDefault();
    await api.createAlert(form);
    setForm({ ...form, message: "" });
    await load();
  }

  async function closeAlert(id) {
    await api.closeAlert(id);
    await load();
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Create Alert</h3>

        <form
          onSubmit={submit}
          style={{
            display: "grid",
            gap: 8,
            gridTemplateColumns: "repeat(6,1fr)"
          }}
        >
          <input
            className="input"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            placeholder="Type"
          />

          <input
            className="input"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
            placeholder="Severity"
          />

          <input
            className="input"
            type="number"
            value={form.lat}
            onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) })}
            placeholder="Lat"
          />

          <input
            className="input"
            type="number"
            value={form.lng}
            onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) })}
            placeholder="Lng"
          />

          <input
            className="input"
            style={{ gridColumn: "span 2" }}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Message"
          />

          <button
            type="submit"
            className="btn"
            style={{ gridColumn: "span 6" }}
          >
            Create
          </button>
        </form>
      </div>

      <AlertsList items={alerts} onClose={closeAlert} />
    </div>
  );
}
