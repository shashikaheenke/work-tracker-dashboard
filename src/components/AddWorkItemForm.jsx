import { useState } from 'react';

const initialFormData = {
  title: '',
  team: '',
  owner: '',
  status: 'Not Started',
  priority: 'Medium',
  type: 'Task',
  source: 'Manual Entry',
  submittedDate: '',
  dueDate: '',
  estimatedHours: '',
  completedHours: '',
  notes: '',
};

function createWorkItemId() {
  return `WI-${Date.now().toString().slice(-6)}`;
}

function AddWorkItemForm({ onAddWorkItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.team.trim() ||
      !formData.owner.trim() ||
      !formData.dueDate
    ) {
      setErrorMessage('Please fill in title, team, owner, and due date.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    const newItem = {
      id: createWorkItemId(),
      title: formData.title.trim(),
      team: formData.team.trim(),
      owner: formData.owner.trim(),
      status: formData.status,
      priority: formData.priority,
      type: formData.type,
      source: formData.source.trim() || 'Manual Entry',
      submittedDate: formData.submittedDate || today,
      dueDate: formData.dueDate,
      estimatedHours: Number(formData.estimatedHours) || 0,
      completedHours: Number(formData.completedHours) || 0,
      notes: formData.notes.trim() || 'No notes added.',
    };

    onAddWorkItem(newItem);

    setFormData(initialFormData);
    setErrorMessage('');
    setIsOpen(false);
  }

  function handleCancel() {
    setFormData(initialFormData);
    setErrorMessage('');
    setIsOpen(false);
  }

  return (
    <section className="add-work-card">
      <div className="add-work-header">
        <div>
          <h2>Add New Work Item</h2>
          <p>
            Create a new fake work item and save it in your browser using
            localStorage.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? 'Close Form' : 'Add Work Item'}
        </button>
      </div>

      {isOpen && (
        <form className="add-work-form" onSubmit={handleSubmit}>
          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <div className="form-grid">
            <label>
              Title *
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Review weekly completed jobs"
              />
            </label>

            <label>
              Team *
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Example: Operations"
              />
            </label>

            <label>
              Owner *
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="Example: Alex Morgan"
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
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
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </label>

            <label>
              Type
              <select name="type" value={formData.type} onChange={handleChange}>
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
                value={formData.source}
                onChange={handleChange}
                placeholder="Example: Manual Entry"
              />
            </label>

            <label>
              Submitted Date
              <input
                type="date"
                name="submittedDate"
                value={formData.submittedDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Due Date *
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Estimated Hours
              <input
                type="number"
                name="estimatedHours"
                value={formData.estimatedHours}
                onChange={handleChange}
                min="0"
                placeholder="Example: 4"
              />
            </label>

            <label>
              Completed Hours
              <input
                type="number"
                name="completedHours"
                value={formData.completedHours}
                onChange={handleChange}
                min="0"
                placeholder="Example: 2"
              />
            </label>

            <label className="full-width">
              Notes
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add a short note about this work item..."
                rows="4"
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Save Work Item
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default AddWorkItemForm;
