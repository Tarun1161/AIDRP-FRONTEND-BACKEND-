import { useEffect, useState } from "react";
import { api } from "../api";
import MapView from "../components/MapView";

export default function Predictions() {
  const [pred, setPred] = useState([]);

  useEffect(() => {
    api.predictions().then(setPred);
  }, []);

  return (
    <div className="container">
      <MapView predictions={pred} alerts={[]} />

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Prediction Zones</h3>

        <ul>
          {pred.map((p) => (
            <li key={p.id}>
              {p.label}: {(p.risk * 100).toFixed(0)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
