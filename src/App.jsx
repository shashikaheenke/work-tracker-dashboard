import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import FilterBar from './components/FilterBar.jsx';
import SummaryCharts from './components/SummaryCharts.jsx';
import WorkTable from './components/WorkTable.jsx';
import { workItems } from './data/workItems.js';
import { countBy, getDashboardStats, getUniqueValues } from './utils/dashboardHelpers.js';
import { exportToCsv } from './utils/exportCsv.js';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const statusOptions = useMemo(() => getUniqueValues(workItems, 'status'), []);
  const teamOptions = useMemo(() => getUniqueValues(workItems, 'team'), []);
  const priorityOptions = useMemo(() => getUniqueValues(workItems, 'priority'), []);

  const filteredItems = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase();

    return workItems.filter((item) => {
      const matchesSearch =
        !normalisedSearch ||
        [item.id, item.title, item.team, item.owner, item.status, item.priority, item.type, item.source, item.notes]
          .join(' ')
          .toLowerCase()
          .includes(normalisedSearch);

      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const matchesTeam = selectedTeam === 'All' || item.team === selectedTeam;
      const matchesPriority = selectedPriority === 'All' || item.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesTeam && matchesPriority;
    });
  }, [searchTerm, selectedStatus, selectedTeam, selectedPriority]);

  const dashboardStats = useMemo(() => getDashboardStats(filteredItems), [filteredItems]);
  const statusCounts = useMemo(() => countBy(filteredItems, 'status'), [filteredItems]);
  const priorityCounts = useMemo(() => countBy(filteredItems, 'priority'), [filteredItems]);

  function handleResetFilters() {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedTeam('All');
    setSelectedPriority('All');
  }

  function handleExport() {
    const rowsForExport = filteredItems.map((item) => ({
      ID: item.id,
      Title: item.title,
      Team: item.team,
      Owner: item.owner,
      Status: item.status,
      Priority: item.priority,
      Type: item.type,
      Source: item.source,
      SubmittedDate: item.submittedDate,
      DueDate: item.dueDate,
      EstimatedHours: item.estimatedHours,
      CompletedHours: item.completedHours,
      Notes: item.notes,
    }));

    exportToCsv('work-tracker-export.csv', rowsForExport);
  }

  return (
    <main className="app-shell">
      <Header onExport={handleExport} resultCount={filteredItems.length} />

      <StatsGrid stats={dashboardStats} />

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedTeam={selectedTeam}
        onTeamChange={setSelectedTeam}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
        statusOptions={statusOptions}
        teamOptions={teamOptions}
        priorityOptions={priorityOptions}
        onReset={handleResetFilters}
      />

      <SummaryCharts statusCounts={statusCounts} priorityCounts={priorityCounts} />

      <WorkTable items={filteredItems} />
    </main>
  );
}

export default App;
