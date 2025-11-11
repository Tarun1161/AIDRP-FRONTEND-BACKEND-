import { useEffect, useState } from "react";
import { api } from "../api";
import KPI from "../components/KPI";
import MapView from "../components/MapView";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [resources, setResources] = useState([]);
  const [pred, setPred] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const [a, r, p] = await Promise.all([
      api.alerts(),
      api.resources(),
      api.predictions()
    ]);
    setAlerts(a);
    setResources(r);
    setPred(p);
  }

  const active = alerts.length;
  const people = resources
    .filter((x) => x.category === "human")
    .reduce((s, x) => s + x.available, 0);

  const vehicles = resources
    .filter((x) => x.category === "vehicle")
    .reduce((s, x) => s + x.available, 0);

  return (
    <div className="container">
      <div className="grid grid-3">
        <KPI label="Active Alerts" value={active} />
        <KPI label="Rescue Personnel" value={people} />
        <KPI label="Vehicles" value={vehicles} />
      </div>

      <div style={{ marginTop: 16 }}>
        <MapView alerts={alerts} predictions={pred} />
      </div>
    </div>
  );
}
