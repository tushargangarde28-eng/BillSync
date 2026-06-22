// Products.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/product.css';

const product = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  });

  // Products state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Laptop Pro X',
      category: 'Electronics',
      price: '$1,299',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      category: 'Audio',
      price: '$199',
      stock: 78,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Smart Watch',
      category: 'Wearables',
      price: '$349',
      stock: 23,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    }
  ]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'products', label: 'Products', icon: '📦', path: '/products' },
    { id: 'invoices', label: 'Invoices', icon: '📄', path: '/invoices' },
    { id: 'customers', label: 'Customers', icon: '👥', path: '/customers' },
    { id: 'reports', label: 'Reports', icon: '📈', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload (convert to base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new product
  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in name and price at least!');
      return;
    }

    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      category: formData.category || 'General',
      price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
      stock: parseInt(formData.stock) || 0,
      image: formData.image || 'https://via.placeholder.com/300x300/7c3aed/ffffff?text=Product'
    };

    setProducts([...products, newProduct]);
    resetForm();
    setShowAddModal(false);
    alert('Product added successfully! ✅');
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace('$', ''),
      stock: product.stock,
      image: product.image
    });
    setShowAddModal(true);
  };

  // Update product
  const handleUpdateProduct = () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in name and price at least!');
      return;
    }

    const updatedProducts = products.map(product => 
      product.id === editingProduct.id ? {
        ...product,
        name: formData.name,
        category: formData.category || 'General',
        price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
        stock: parseInt(formData.stock) || 0,
        image: formData.image || product.image
      } : product
    );

    setProducts(updatedProducts);
    resetForm();
    setShowAddModal(false);
    setEditingProduct(null);
    alert('Product updated successfully! ✅');
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully! 🗑️');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: ''
    });
  };

  // Close modal
  const closeModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    resetForm();
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 16L16 23L30 16" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 23L16 30L30 23" stroke="#A78BFA" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="16" r="2.5" fill="#A78BFA"/>
            </svg>
            <span className="sidebar-brand">BillSync</span>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${window.location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              {isSidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            {isSidebarOpen && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Navbar */}
        <header className="navbar">
          <div className="navbar-left">
            <h2 className="page-title">Products</h2>
          </div>
          <div className="navbar-right">
            <button className="nav-icon-btn" title="Notifications">
              🔔
              <span className="notification-badge">3</span>
            </button>
            <button className="nav-icon-btn" title="Messages">
              💬
            </button>
            <div className="user-profile">
              <div className="avatar">
                <span>AZ</span>
              </div>
              <div className="user-info">
                <span className="user-name">Ankita Zade</span>
                <span className="user-role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body - Products Content */}
        <div className="page-body">
          <div className="products-page">
            <div className="products-header">
              <h1>Products</h1>
              <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
                + Add New Product
              </button>
            </div>
            
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-details">
                    <h4>{product.name}</h4>
                    <p className="product-category">{product.category}</p>
                    <div className="product-meta">
                      <span className="product-price">{product.price}</span>
                      <span className="product-stock">Stock: {product.stock}</span>
                    </div>
                    <div className="product-actions">
                      <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                        ✏️ Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter category (e.g., Electronics)"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Price *</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="e.g., 99.99"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group half">
                  <label>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Quantity"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-input"
                    id="imageInput"
                  />
                  <label htmlFor="imageInput" className="image-upload-label">
                    {formData.image ? 'Change Image' : 'Upload Image'}
                  </label>
                  {formData.image && (
                    <div className="image-preview-container">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="image-preview"
                      />
                      <button 
                        className="remove-image"
                        onClick={() => setFormData({ ...formData, image: '' })}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button 
                  className="submit-btn"
                  onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;