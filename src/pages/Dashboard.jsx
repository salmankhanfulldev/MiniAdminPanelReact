import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContextValue";
import ChartPanel from "../components/ChartPanel";

export default function Dashboard() {
  const { products, orders, categories } = useContext(AppContext);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (s, o) => s + (o.status !== "Cancelled" ? Number(o.total || 0) : 0),
    0,
  );

  const chartData = useMemo(() => {
    return categories.map((c) => ({
      id: c.id,
      name: c.name,
      count: products.filter((p) => p.categoryId === c.id).length,
    }));
  }, [categories, products]);

  return (
    <div className="dashboard">
      <div className="cards">
        <div className="card stat">
          {" "}
          <h4>Total Products</h4> <div className="big">{totalProducts}</div>
        </div>
        <div className="card stat">
          {" "}
          <h4>Total Orders</h4> <div className="big">{totalOrders}</div>
        </div>
        <div className="card stat">
          {" "}
          <h4>Total Revenue</h4>{" "}
          <div className="big">${totalRevenue.toFixed(2)}</div>
        </div>
      </div>
      <ChartPanel data={chartData} />
    </div>
  );
}
