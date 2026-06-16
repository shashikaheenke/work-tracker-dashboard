import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatsGrid from './components/StatsGrid.jsx';
import FilterBar from './components/FilterBar.jsx';
import SummaryCharts from './components/SummaryCharts.jsx';
import WorkTable from './components/WorkTable.jsx';
import AddWorkItemForm from './components/AddWorkItemForm.jsx';
import { workItems } from './data/workItems.js';
import {
  countBy,
  getDashboardStats,
  getUniqueValues,
} from './utils/dashboardHelpers.js';
import { exportToCsv } from './utils/exportCsv.js';

const STORAGE_KEY = 'work-tracker-dashboard-items';

function getStoredWorkItems() {
  const storedItems = localStorage.getItem(STORAGE_KEY);

  if (!storedItems) {
    return workItems;
  }

  try {
    const parsedItems = JSON.parse(storedItems);

    if (Array.isArray(parsedItems)) {
      return parsedItems;
    }

    return workItems;
  } catch {
    return workItems;
  }
}

function App() {
  const [items, setItems] = useState(getStoredWorkItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const statusOptions = useMemo(
    () => getUniqueValues(items, 'status'),
    [items],
  );
  const teamOptions = useMemo(() => getUniqueValues(items, 'team'), [items]);
  const priorityOptions = useMemo(
    () => getUniqueValues(items, 'priority'),
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !normalisedSearch ||
        [
          item.id,
          item.title,
          item.team,
          item.owner,
          item.status,
          item.priority,
          item.type,
          item.source,
          item.notes,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalisedSearch);

      const matchesStatus =
        selectedStatus === 'All' || item.status === selectedStatus;
      const matchesTeam = selectedTeam === 'All' || item.team === selectedTeam;
      const matchesPriority =
        selectedPriority === 'All' || item.priority === selectedPriority;

      return matchesSearch && matchesStatus && matchesTeam && matchesPriority;
    });
  }, [items, searchTerm, selectedStatus, selectedTeam, selectedPriority]);

  const dashboardStats = useMemo(
    () => getDashboardStats(filteredItems),
    [filteredItems],
  );
  const statusCounts = useMemo(
    () => countBy(filteredItems, 'status'),
    [filteredItems],
  );
  const priorityCounts = useMemo(
    () => countBy(filteredItems, 'priority'),
    [filteredItems],
  );

  function handleAddWorkItem(newItem) {
    setItems((currentItems) => [newItem, ...currentItems]);
  }

  function handleUpdateWorkItem(updatedItem) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem;
        }

        return item;
      }),
    );
  }

  function handleDeleteWorkItem(itemId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this work item?',
    );

    if (!confirmed) {
      return;
    }

    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function handleResetDemoData() {
    const confirmed = window.confirm(
      'This will remove any work items you added or edited and restore the original fake demo data. Continue?',
    );

    if (!confirmed) {
      return;
    }

    setItems(workItems);
    localStorage.removeItem(STORAGE_KEY);
    handleResetFilters();
  }

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

      <AddWorkItemForm onAddWorkItem={handleAddWorkItem} />

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

      <SummaryCharts
        statusCounts={statusCounts}
        priorityCounts={priorityCounts}
      />

      <div className="table-actions">
        <div>
          <h2>Work Items</h2>
          <p>
            Showing {filteredItems.length} of {items.length} work items.
          </p>
        </div>

        <button
          className="secondary-button danger-button"
          onClick={handleResetDemoData}
        >
          Reset Demo Data
        </button>
      </div>

      <WorkTable
        items={filteredItems}
        onUpdateWorkItem={handleUpdateWorkItem}
        onDeleteWorkItem={handleDeleteWorkItem}
      />
    </main>
  );
}

export default App;
