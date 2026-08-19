import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContextValue";
import CategoryForm from "../components/CategoryForm";

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useContext(AppContext);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }
  function handleEdit(cat) {
    setEditing(cat);
    setShowForm(true);
  }
  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }
  function handleSubmit(name) {
    if (editing) updateCategory(editing.id, name);
    else addCategory(name);
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>Categories</h2>
        <div>
          <button className="btn" onClick={handleAdd}>
            Add Category
          </button>
        </div>
      </div>

      {showForm && (
        <CategoryForm
          initial={editing}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}

      <div className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <button className="btn small" onClick={() => handleEdit(c)}>
                    Edit
                  </button>
                  <button
                    className="btn small muted"
                    onClick={() => {
                      if (confirm("Delete category?")) deleteCategory(c.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
