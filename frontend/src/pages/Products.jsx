// Products.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/product.css';

const Products = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Veg', 'Non-Veg', 'Thali', 'Drink', 'Snacks'];

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
      name: 'Paneer Butter Masala',
      category: 'Veg',
      price: '$12.99',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1633945274405-b6cbf904b382?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Chicken Biryani',
      category: 'Non-Veg',
      price: '$15.99',
      stock: 78,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Veg Thali',
      category: 'Thali',
      price: '$18.99',
      stock: 23,
      image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c2?w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Mango Smoothie',
      category: 'Drink',
      price: '$5.99',
      stock: 56,
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'French Fries',
      category: 'Snacks',
      price: '$4.99',
      stock: 89,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Butter Chicken',
      category: 'Non-Veg',
      price: '$16.99',
      stock: 34,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=300&fit=crop'
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

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      category: formData.category || 'Veg',
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
        category: formData.category || 'Veg',
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
            {/* Search Bar with Add Button */}
            <div className="search-container">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                  >
                    ✕
                  </button>
                )}
                <button 
                  className="add-product-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Product
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="categories-container">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                ))
              ) : (
                <div className="no-products">
                  <span className="no-products-icon">📦</span>
                  <h3>No products found</h3>
                  <p>Try adjusting your search or category filter</p>
                </div>
              )}
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
                <label>Category *</label>
                <select
                  name="category"
                  className="category-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.filter(c => c !== 'All').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
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