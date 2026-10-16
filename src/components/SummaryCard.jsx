

function SummaryCard({title,value}) {
  return (
    <div className="summary-card">
      <h1 className="summary-title">{title}</h1>
      <p className="summary-value">{value}</p>

    </div>
  )
}

export default SummaryCard