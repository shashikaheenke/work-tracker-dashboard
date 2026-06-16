import StatCard from './StatCard.jsx';

function StatsGrid({ stats }) {
  return (
    <section className="stats-grid" aria-label="Dashboard summary cards">
      <StatCard label="Total Work Items" value={stats.totalItems} helper="Current filtered workload" />
      <StatCard label="Completed" value={stats.completedItems} helper={`${stats.completionRate}% completion rate`} tone="success" />
      <StatCard label="Overdue" value={stats.overdueItems} helper="Needs attention" tone="danger" />
      <StatCard label="Blocked" value={stats.blockedItems} helper="Waiting for input" tone="warning" />
      <StatCard label="Estimated Hours" value={stats.totalEstimatedHours} helper="Planned effort" />
      <StatCard label="Completed Hours" value={stats.totalCompletedHours} helper="Logged progress" tone="success" />
    </section>
  );
}

export default StatsGrid;
