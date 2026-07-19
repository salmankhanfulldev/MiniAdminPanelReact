import React, { useEffect, useState } from 'react';

export default function ProductForm({ categories, onCancel, onSubmit, initial }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    categoryId: '',
    stock: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ ...initial });
  }, [initial]);

  function validate() {
    const e = {};
    if (!form.name) e.name = 'Name is required';
    if (form.price === '' || Number.isNaN(Number(form.price)) || Number(form.price) < 0) e.price = 'Price must be a number >= 0';
    if (form.stock === '' || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = 'Stock must be a number >= 0';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      const payload = {
        name: form.name,
        price: Number(form.price),
        categoryId: form.categoryId || null,
        stock: Number(form.stock),
        image: form.image || '',
      };
      onSubmit(payload);
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="form-row">
        <label>Price</label>
        <input name="price" value={form.price} onChange={handleChange} />
        {errors.price && <small className="error">{errors.price}</small>}
      </div>

      <div className="form-row">
        <label>Category</label>
        <select name="categoryId" value={form.categoryId || ''} onChange={handleChange}>
          <option value="">— Unassigned —</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Stock</label>
        <input name="stock" value={form.stock} onChange={handleChange} />
        {errors.stock && <small className="error">{errors.stock}</small>}
      </div>

      <div className="form-row">
        <label>Image URL</label>
        <input name="image" value={form.image} onChange={handleChange} />
      </div>

      <div className="form-actions">
        <button className="btn" type="submit">Save</button>
        <button type="button" className="btn muted" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}