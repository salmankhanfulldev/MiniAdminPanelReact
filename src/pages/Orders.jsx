import React, { useContext } from "react";
import { AppContext } from "../context/AppContextValue";

export default function Orders() {
  const { orders, updateOrderStatus, products } = useContext(AppContext);

  function mark(id, status) {
    updateOrderStatus(id, status);
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>Orders</h2>
      </div>
      <div className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>
                  {o.items.map((it) => (
                    <div key={it.productId}>
                      {products.find((p) => p.id === it.productId)?.name ||
                        "Unknown"}{" "}
                      x {it.qty}
                    </div>
                  ))}
                </td>
                <td>${Number(o.total).toFixed(2)}</td>
                <td>{o.status}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  {o.status !== "Shipped" && (
                    <button
                      className="btn small"
                      onClick={() => mark(o.id, "Shipped")}
                    >
                      Mark Shipped
                    </button>
                  )}
                  {o.status !== "Cancelled" && (
                    <button
                      className="btn small muted"
                      onClick={() => mark(o.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
