function Header({ onExport, resultCount }) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Portfolio Project 1</p>
        <h1>Work Tracker Dashboard</h1>
        <p className="header-text">
          A simple internal dashboard for teams who track work in Excel, CSV files, or manual lists.
        </p>
      </div>

      <div className="header-actions">
        <span className="result-pill">{resultCount} records shown</span>
        <button className="primary-button" onClick={onExport} type="button">
          Export CSV
        </button>
      </div>
    </header>
  );
}

export default Header;
