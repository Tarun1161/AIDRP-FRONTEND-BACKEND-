export default function ResourceCards({ items = [] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 16
      }}
    >
      {items.map((r) => (
        <div key={r.id} className="card">
          <div style={{ fontWeight: 700 }}>{r.name}</div>
          <div style={{ opacity: 0.8 }}>{r.category}</div>
          <div style={{ marginTop: 8 }}>Available: {r.available}</div>
          <div>In Use: {r.in_use}</div>
        </div>
      ))}
    </div>
  );
}
