export default function KPI({ label, value, note }) {
  return (
    <div className="card">
      <div className="kpi">{value}</div>
      <div style={{ opacity: 0.8 }}>{label}</div>
      {note && (
        <div style={{ opacity: 0.6, fontSize: 12, marginTop: 6 }}>{note}</div>
      )}
    </div>
  );
}
