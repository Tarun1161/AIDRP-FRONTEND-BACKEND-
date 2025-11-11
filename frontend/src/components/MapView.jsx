import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

export default function MapView({ alerts = [], predictions = [] }) {
  const center = alerts.length
    ? [alerts[0].lat, alerts[0].lng]
    : [17.385, 78.4867];

  return (
    <div className="card" style={{ height: 420 }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "100%", borderRadius: 12 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {alerts.map((a) => (
          <Marker key={a.id} position={[a.lat, a.lng]}>
            <Popup>
              <strong>
                Alert #{a.id} – {a.type}
              </strong>
              <br />
              Severity: {a.severity}
              <br />
              {a.message}
            </Popup>
          </Marker>
        ))}

        {predictions.map((p) => (
          <Circle
            key={p.id}
            center={[p.lat, p.lng]}
            radius={15000 + p.risk * 40000}
          >
            <Popup>
              <strong>{p.label}</strong>
              <br />
              Risk: {(p.risk * 100).toFixed(0)}%
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
