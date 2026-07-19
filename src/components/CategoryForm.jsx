import React, { useEffect, useState } from 'react';

export default function CategoryForm({ initial, onCancel, onSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) setName(initial.name || '');
  }, [initial]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError('Name required');
    onSubmit(name.trim());
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
        {error && <small className="error">{error}</small>}
      </div>
      <div className="form-actions">
        <button className="btn" type="submit">Save</button>
        <button type="button" className="btn muted" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}