function FilterBar({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedTeam,
  onTeamChange,
  selectedPriority,
  onPriorityChange,
  statusOptions,
  teamOptions,
  priorityOptions,
  onReset,
}) {
  return (
    <section className="filter-card" aria-label="Dashboard filters">
      <div className="search-group">
        <label htmlFor="search">Search work</label>
        <input
          id="search"
          type="search"
          placeholder="Search by ID, title, owner, type, source..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select id="status" value={selectedStatus} onChange={(event) => onStatusChange(event.target.value)}>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="team">Team</label>
        <select id="team" value={selectedTeam} onChange={(event) => onTeamChange(event.target.value)}>
          {teamOptions.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={selectedPriority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button className="secondary-button" onClick={onReset} type="button">
        Reset
      </button>
    </section>
  );
}

export default FilterBar;
