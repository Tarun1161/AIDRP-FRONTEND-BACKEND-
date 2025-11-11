export default function AlertsList({ items = [], onClose }) {
  return (
    <div className="card">
      <h3>Active Alerts</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Message</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.type}</td>
              <td>{a.severity}</td>
              <td>{a.message}</td>
              <td>{a.status}</td>
              <td>
                {a.status !== "closed" && (
                  <button className="btn" onClick={() => onClose(a.id)}>
                    Close
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
