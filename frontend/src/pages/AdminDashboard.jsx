// MobileApp.jsx - BillSync POS Mobile Application
import React, { useState } from 'react';
import '../css/AdminDashboard.css'

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy products data
  const products = [
    { id: 1, name: 'Espresso Coffee', price: 3.50, category: 'Beverages', stock: 45, image: '☕' },
    { id: 2, name: 'Cappuccino', price: 4.50, category: 'Beverages', stock: 32, image: '☕' },
    { id: 3, name: 'Latte Macchiato', price: 5.00, category: 'Beverages', stock: 28, image: '🥤' },
    { id: 4, name: 'Croissant', price: 3.00, category: 'Pastries', stock: 15, image: '🥐' },
    { id: 5, name: 'Chocolate Muffin', price: 3.50, category: 'Pastries', stock: 12, image: '🧁' },
    { id: 6, name: 'Cheesecake Slice', price: 5.50, category: 'Desserts', stock: 8, image: '🍰' },
    { id: 7, name: 'Fresh Orange Juice', price: 4.00, category: 'Beverages', stock: 20, image: '🧃' },
    { id: 8, name: 'Club Sandwich', price: 8.50, category: 'Food', stock: 10, image: '🥪' },
    { id: 9, name: 'Caesar Salad', price: 7.50, category: 'Food', stock: 7, image: '🥗' },
    { id: 10, name: 'Tiramisu', price: 6.00, category: 'Desserts', stock: 5, image: '🍫' },
  ];

  const categories = ['All', 'Beverages', 'Pastries', 'Desserts', 'Food'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return null;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item !== null));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Recent orders for Orders tab
  const recentOrders = [
    { id: 'ORD-001', customer: 'Walk-in Customer', amount: 24.50, status: 'Completed', time: '2 mins ago', items: 3 },
    { id: 'ORD-002', customer: 'John Smith', amount: 42.00, status: 'Preparing', time: '15 mins ago', items: 4 },
    { id: 'ORD-003', customer: 'Sarah Johnson', amount: 18.50, status: 'Completed', time: '32 mins ago', items: 2 },
    { id: 'ORD-004', customer: 'Mike Chen', amount: 67.00, status: 'Pending', time: '1 hour ago', items: 5 },
  ];

  // Analytics data
  const analytics = {
    todaySales: 847.50,
    totalOrders: 42,
    avgOrderValue: 20.18,
    topProduct: 'Cappuccino'
  };

  return (
    <div className="mobile-app">
      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <span>📶 🔋 100%</span>
      </div>

      {/* Header */}
      <div className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">💰</div>
            <div>
              <h1 className="app-title">BillSync POS</h1>
              <p className="app-subtitle">Smart Billing System</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">👤</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {activeTab === 'pos' && (
          <div className="pos-view">
            {/* Search Bar */}
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Categories */}
            <div className="categories-scroll">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card" onClick={() => addToCart(product)}>
                  <div className="product-emoji">{product.image}</div>
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">${product.price}</p>
                  <div className="stock-badge">In Stock: {product.stock}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="cart-view">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add items from the POS tab</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-price">${item.price}</span>
                      </div>
                      <div className="cart-item-actions">
                        <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                        <span className="item-qty">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${getTotalAmount()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%):</span>
                    <span>${(getTotalAmount() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${(getTotalAmount() * 1.1).toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout →</button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-view">
            <div className="section-header">
              <h3>Recent Orders</h3>
              <button className="filter-btn">Filter ▼</button>
            </div>
            <div className="orders-list">
              {recentOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <span className="order-id">{order.id}</span>
                      <span className="order-time">{order.time}</span>
                    </div>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <span>{order.customer}</span>
                    <span>{order.items} items</span>
                    <span className="order-amount">${order.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view">
            <div className="stats-grid-mobile">
              <div className="stat-card-mobile">
                <div className="stat-icon-mobile">💰</div>
                <div>
                  <h3>${analytics.todaySales}</h3>
                  <p>Today's Sales</p>
                </div>
              </div>
              <div className="stat-card-mobile">
                <div className="stat-icon-mobile">📦</div>
                <div>
                  <h3>{analytics.totalOrders}</h3>
                  <p>Total Orders</p>
                </div>
              </div>
              <div className="stat-card-mobile">
                <div className="stat-icon-mobile">💵</div>
                <div>
                  <h3>${analytics.avgOrderValue}</h3>
                  <p>Avg Order Value</p>
                </div>
              </div>
              <div className="stat-card-mobile">
                <div className="stat-icon-mobile">🏆</div>
                <div>
                  <h3>{analytics.topProduct}</h3>
                  <p>Top Product</p>
                </div>
              </div>
            </div>

            {/* Simple Chart */}
            <div className="chart-container-mobile">
              <h4>Weekly Sales Trend</h4>
              <div className="mini-chart">
                {[65, 78, 82, 91, 88, 95, 102].map((height, i) => (
                  <div key={i} className="chart-bar-container">
                    <div className="chart-bar-mobile" style={{ height: `${height}px` }}></div>
                    <span>Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button 
          className={`nav-item-mobile ${activeTab === 'pos' ? 'active' : ''}`}
          onClick={() => setActiveTab('pos')}
        >
          <span className="nav-icon">🏪</span>
          <span className="nav-label">POS</span>
        </button>
        <button 
          className={`nav-item-mobile ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          <span className="nav-icon">🛒</span>
          <span className="nav-label">Cart</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
        <button 
          className={`nav-item-mobile ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <span className="nav-icon">📋</span>
          <span className="nav-label">Orders</span>
        </button>
        <button 
          className={`nav-item-mobile ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default MobileApp;