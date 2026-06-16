import { useState } from 'react';
import { getCompletionPercentage } from '../utils/dashboardHelpers.js';

function WorkTable({ items, onUpdateWorkItem, onDeleteWorkItem }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  function startEditing(item) {
    setEditingItemId(item.id);
    setEditFormData({
      ...item,
      estimatedHours: String(item.estimatedHours),
      completedHours: String(item.completedHours),
    });
    setErrorMessage('');
  }

  function cancelEditing() {
    setEditingItemId(null);
    setEditFormData(null);
    setErrorMessage('');
  }

  function handleEditChange(event) {
    const { name, value } = event.target;

    setEditFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSaveEdit(event) {
    event.preventDefault();

    if (
      !editFormData.title.trim() ||
      !editFormData.team.trim() ||
      !editFormData.owner.trim() ||
      !editFormData.dueDate
    ) {
      setErrorMessage('Please fill in title, team, owner, and due date.');
      return;
    }

    const updatedItem = {
      ...editFormData,
      title: editFormData.title.trim(),
      team: editFormData.team.trim(),
      owner: editFormData.owner.trim(),
      source: editFormData.source.trim() || 'Manual Entry',
      estimatedHours: Number(editFormData.estimatedHours) || 0,
      completedHours: Number(editFormData.completedHours) || 0,
      notes: editFormData.notes.trim() || 'No notes added.',
    };

    onUpdateWorkItem(updatedItem);
    cancelEditing();
  }

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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const completion = getCompletionPercentage(item);
              const isEditing = editingItemId === item.id;

              if (isEditing && editFormData) {
                return (
                  <tr key={item.id} className="edit-row">
                    <td colSpan="9">
                      <form
                        className="inline-edit-form"
                        onSubmit={handleSaveEdit}
                      >
                        <div className="edit-form-header">
                          <div>
                            <h3>Edit Work Item</h3>
                            <p>{item.id}</p>
                          </div>

                          <button
                            type="button"
                            className="secondary-button"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>
                        </div>

                        {errorMessage && (
                          <p className="form-error">{errorMessage}</p>
                        )}

                        <div className="form-grid">
                          <label>
                            Title *
                            <input
                              type="text"
                              name="title"
                              value={editFormData.title}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Team *
                            <input
                              type="text"
                              name="team"
                              value={editFormData.team}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Owner *
                            <input
                              type="text"
                              name="owner"
                              value={editFormData.owner}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Status
                            <select
                              name="status"
                              value={editFormData.status}
                              onChange={handleEditChange}
                            >
                              <option value="Not Started">Not Started</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Blocked">Blocked</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </label>

                          <label>
                            Priority
                            <select
                              name="priority"
                              value={editFormData.priority}
                              onChange={handleEditChange}
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Urgent">Urgent</option>
                            </select>
                          </label>

                          <label>
                            Type
                            <select
                              name="type"
                              value={editFormData.type}
                              onChange={handleEditChange}
                            >
                              <option value="Task">Task</option>
                              <option value="Query">Query</option>
                              <option value="Review">Review</option>
                              <option value="Report">Report</option>
                              <option value="Bug">Bug</option>
                            </select>
                          </label>

                          <label>
                            Source
                            <input
                              type="text"
                              name="source"
                              value={editFormData.source}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Submitted Date
                            <input
                              type="date"
                              name="submittedDate"
                              value={editFormData.submittedDate}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Due Date *
                            <input
                              type="date"
                              name="dueDate"
                              value={editFormData.dueDate}
                              onChange={handleEditChange}
                            />
                          </label>

                          <label>
                            Estimated Hours
                            <input
                              type="number"
                              name="estimatedHours"
                              value={editFormData.estimatedHours}
                              onChange={handleEditChange}
                              min="0"
                            />
                          </label>

                          <label>
                            Completed Hours
                            <input
                              type="number"
                              name="completedHours"
                              value={editFormData.completedHours}
                              onChange={handleEditChange}
                              min="0"
                            />
                          </label>

                          <label className="full-width">
                            Notes
                            <textarea
                              name="notes"
                              value={editFormData.notes}
                              onChange={handleEditChange}
                              rows="4"
                            />
                          </label>
                        </div>

                        <div className="form-actions">
                          <button
                            type="button"
                            className="secondary-button"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </button>

                          <button type="submit" className="primary-button">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={item.id}>
                  <td className="id-cell">{item.id}</td>

                  <td>
                    <div className="work-title">{item.title}</div>
                    <span className="work-subtitle">
                      {item.type} • {item.source}
                    </span>
                  </td>

                  <td>{item.team}</td>
                  <td>{item.owner}</td>

                  <td>
                    <span
                      className={`badge status ${item.status.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>{new Date(item.dueDate).toLocaleDateString('en-GB')}</td>

                  <td>
                    <div className="progress-cell">
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{ width: `${completion}%` }}
                        />
                      </div>
                      <span>{completion}%</span>
                    </div>
                  </td>

                  <td>
                    <div className="row-actions">
                      <button
                        className="table-action-button edit-button"
                        onClick={() => startEditing(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="table-action-button delete-button"
                        onClick={() => onDeleteWorkItem(item.id)}
                      >
                        Delete
                      </button>
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
