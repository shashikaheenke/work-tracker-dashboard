import { getCompletionPercentage } from '../utils/dashboardHelpers.js';

function WorkTable({ items }) {
  if (!items.length) {
    return (
      <section className="table-card empty-state">
        <h2>No work items found</h2>
        <p>Try changing the search text or resetting the filters.</p>
      </section>
    );
  }

  return (
    <section className="table-card">
      <div className="section-heading table-heading">
        <div>
          <h2>Work Items</h2>
          <p>Filtered list of work requests, tasks, and tracker items</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Work Item</th>
              <th>Team</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const completion = getCompletionPercentage(item);

              return (
                <tr key={item.id}>
                  <td className="id-cell">{item.id}</td>
                  <td>
                    <div className="work-title">{item.title}</div>
                    <span className="work-subtitle">{item.type} • {item.source}</span>
                  </td>
                  <td>{item.team}</td>
                  <td>{item.owner}</td>
                  <td>
                    <span className={`badge status ${item.status.toLowerCase().replaceAll(' ', '-')}`}>{item.status}</span>
                  </td>
                  <td>
                    <span className={`badge priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
                  </td>
                  <td>{new Date(item.dueDate).toLocaleDateString('en-GB')}</td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${completion}%` }} />
                      </div>
                      <span>{completion}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WorkTable;
