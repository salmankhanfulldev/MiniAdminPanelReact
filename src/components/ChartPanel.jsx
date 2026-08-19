import React from "react";
import { categoryImages } from "../data/productImages";

export default function ChartPanel({ data }) {
  const maxCount = Math.max(1, ...data.map((category) => category.count));

  return (
    <div className="card chart-card">
      <h3>Products by Category</h3>
      <div className="category-grid">
        {data.map((category) => (
          <article className="category-card" key={category.id}>
            <div className="category-card-image">
              <img
                src={categoryImages[category.name]}
                alt={`${category.name} products`}
              />
              <span className="category-card-count">{category.count}</span>
            </div>
            <div className="category-card-details">
              <div className="category-card-heading">
                <h4>{category.name}</h4>
                <span>{category.count === 1 ? "item" : "items"}</span>
              </div>
              <div
                className="category-progress"
                aria-label={`${category.count} products`}
              >
                <span
                  style={{ width: `${(category.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
