function SummaryCharts({ statusCounts, priorityCounts }) {
  const statusEntries = Object.entries(statusCounts);
  const priorityEntries = Object.entries(priorityCounts);
  const maxStatus = Math.max(...statusEntries.map(([, count]) => count), 1);
  const maxPriority = Math.max(...priorityEntries.map(([, count]) => count), 1);

  return (
    <section className="chart-grid">
      <article className="chart-card">
        <div className="section-heading">
          <h2>Status Summary</h2>
          <p>How the filtered work is progressing</p>
        </div>
        <div className="bar-list">
          {statusEntries.map(([status, count]) => (
            <div className="bar-row" key={status}>
              <div className="bar-label">
                <span>{status}</span>
                <strong>{count}</strong>
              </div>
              <div className="bar-track" aria-label={`${status}: ${count}`}>
                <div className={`bar-fill ${status.toLowerCase().replaceAll(' ', '-')}`} style={{ width: `${(count / maxStatus) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="chart-card">
        <div className="section-heading">
          <h2>Priority Summary</h2>
          <p>Useful for spotting urgent workload</p>
        </div>
        <div className="bar-list">
          {priorityEntries.map(([priority, count]) => (
            <div className="bar-row" key={priority}>
              <div className="bar-label">
                <span>{priority}</span>
                <strong>{count}</strong>
              </div>
              <div className="bar-track" aria-label={`${priority}: ${count}`}>
                <div className={`bar-fill ${priority.toLowerCase()}`} style={{ width: `${(count / maxPriority) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default SummaryCharts;
