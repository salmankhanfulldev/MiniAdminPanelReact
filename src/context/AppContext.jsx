import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categoryImages } from "../data/productImages";
import { AppContext } from "./AppContextValue";

const LS_KEYS = {
  products: "mini_admin_products",
  categories: "mini_admin_categories",
  orders: "mini_admin_orders",
  auth: "mini_admin_auth",
};

const sampleCategories = [
  { id: "cat-1", name: "Electronics" },
  { id: "cat-2", name: "Clothing" },
  { id: "cat-3", name: "Home" },
];

const sampleProducts = [
  {
    id: "p-1",
    name: "Smartphone",
    price: 699,
    categoryId: "cat-1",
    stock: 12,
    image: categoryImages.Electronics,
  },
  {
    id: "p-2",
    name: "T-Shirt",
    price: 19.99,
    categoryId: "cat-2",
    stock: 120,
    image: categoryImages.Clothing,
  },
  {
    id: "p-3",
    name: "Coffee Maker",
    price: 49.5,
    categoryId: "cat-3",
    stock: 22,
    image: categoryImages.Home,
  },
];

const sampleOrders = [
  {
    id: "o-1",
    items: [{ productId: "p-1", qty: 1, price: 699 }],
    total: 699,
    status: "Processing",
    createdAt: new Date().toISOString(),
  },
  {
    id: "o-2",
    items: [{ productId: "p-2", qty: 2, price: 19.99 }],
    total: 39.98,
    status: "Shipped",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const defaultAuth = { user: null };

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("LS read error", e);
    return fallback;
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LS write error", e);
  }
}

export function AppProvider({ children }) {
  const [categories, setCategories] = useState(() =>
    readLS(LS_KEYS.categories, sampleCategories),
  );
  const [products, setProducts] = useState(() => {
    const savedProducts = readLS(LS_KEYS.products, sampleProducts);
    return savedProducts.map((product) => {
      const category = sampleCategories.find(
        (item) => item.id === product.categoryId,
      );
      return {
        ...product,
        image: product.image || categoryImages[category?.name] || "",
      };
    });
  });
  const [orders, setOrders] = useState(() =>
    readLS(LS_KEYS.orders, sampleOrders),
  );
  const [auth, setAuth] = useState(() => readLS(LS_KEYS.auth, defaultAuth));

  // Sync to localStorage
  useEffect(() => writeLS(LS_KEYS.categories, categories), [categories]);
  useEffect(() => writeLS(LS_KEYS.products, products), [products]);
  useEffect(() => writeLS(LS_KEYS.orders, orders), [orders]);
  useEffect(() => writeLS(LS_KEYS.auth, auth), [auth]);

  // Product CRUD
  function addProduct(data) {
    const p = { ...data, id: uuidv4() };
    setProducts((prev) => [p, ...prev]);
    return p;
  }
  function updateProduct(id, updates) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  }
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Optionally: remove product from orders (left as historical)
  }

  // Category CRUD
  function addCategory(name) {
    const c = { id: uuidv4(), name };
    setCategories((prev) => [c, ...prev]);
    return c;
  }
  function updateCategory(id, name) {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c)),
    );
  }
  function deleteCategory(id) {
    // unlink products that had this category
    setProducts((prev) =>
      prev.map((p) => (p.categoryId === id ? { ...p, categoryId: null } : p)),
    );
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  // Orders
  function addOrder(order) {
    const o = { ...order, id: uuidv4(), createdAt: new Date().toISOString() };
    setOrders((prev) => [o, ...prev]);
    return o;
  }
  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  // Simple auth — hardcoded demo user: admin / admin123
  function login(username, password) {
    if (username === "admin" && password === "admin123") {
      const user = { username: "admin", name: "Admin" };
      setAuth({ user });
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials" };
  }
  function logout() {
    setAuth({ user: null });
  }

  const value = {
    products,
    categories,
    orders,
    auth,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    addOrder,
    updateOrderStatus,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
