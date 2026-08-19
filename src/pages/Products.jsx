import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContextValue";
import { categoryImages } from "../data/productImages";
import ProductForm from "../components/ProductForm";

const PAGE_SIZE = 6;

export default function Products() {
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useContext(AppContext);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }
  function handleEdit(p) {
    setEditing(p);
    setShowForm(true);
  }
  function handleDelete(id) {
    if (confirm("Delete this product?")) deleteProduct(id);
  }
  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }
  function handleSubmit(payload) {
    if (editing) {
      updateProduct(editing.id, payload);
    } else {
      addProduct(payload);
    }
    setShowForm(false);
    setEditing(null);
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>Products</h2>
        <div>
          <input
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" onClick={handleAdd}>
            Add Product
          </button>
        </div>
      </div>

      {showForm && (
        <ProductForm
          categories={categories}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          initial={editing}
        />
      )}

      <div className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="product-image">
                    <img
                      src={
                        p.image ||
                        categoryImages[
                          categories.find((c) => c.id === p.categoryId)?.name
                        ]
                      }
                      alt={p.name}
                      onError={(event) => {
                        const categoryName = categories.find(
                          (c) => c.id === p.categoryId,
                        )?.name;
                        const fallback = categoryImages[categoryName];
                        if (fallback && event.currentTarget.src !== fallback)
                          event.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                </td>
                <td>{p.name}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td>
                  {categories.find((c) => c.id === p.categoryId)?.name || "—"}
                </td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn small" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="btn small muted"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="btn small"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            className="btn small"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
