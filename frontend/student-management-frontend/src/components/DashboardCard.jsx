function DashboardCard({ title, value, color }) {
  return (
    <div className={`card text-white bg-${color} shadow h-100`}>
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <h2 className="fw-bold">{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;