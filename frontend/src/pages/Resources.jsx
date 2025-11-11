import { useEffect, useState } from "react";
import { api } from "../api";
import ResourceCards from "../components/ResourceCards";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    name: "Rescue Team B",
    category: "human",
    available: 10,
    in_use: 0
  });

  useEffect(() => load(), []);

  async function load() {
    setResources(await api.resources());
  }

  async function submit(e) {
    e.preventDefault();
    await api.createResource({
      ...form,
      available: +form.available,
      in_use: +form.in_use
    });
    await load();
  }

  const chartData = resources.map((r) => ({
    name: r.name,
    available: r.available,
    in_use: r.in_use
  }));

  return (
    <div className="container">
      <div className="card">
        <h3>Add Resource</h3>

        <form
          onSubmit={submit}
          style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(5,1fr)" }}
        >
          <input
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            className="input"
            type="number"
            value={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.value })}
          />

          <input
            className="input"
            type="number"
            value={form.in_use}
            onChange={(e) => setForm({ ...form, in_use: e.target.value })}
          />

          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>

      <ResourceCards items={resources} />

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Utilization Chart</h3>

        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area dataKey="available" fillOpacity={0.3} />
              <Area dataKey="in_use" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
