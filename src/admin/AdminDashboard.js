import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
    // 1. ALL STATES PRESERVED
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/products';
    const ORDERS_URL = 'http://localhost:5000/api/orders';

    const [formItem, setFormItem] = useState({
        name: '', price: '', category: 'Electronics', brand: '', image: '' 
    });

    // 2. FETCH DATA ON LOAD
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, orderRes] = await Promise.all([
                    fetch(API_URL),
                    fetch(ORDERS_URL)
                ]);
                const prods = await prodRes.json();
                const ords = await orderRes.json();
                
                // Clean data: Only keep products that have at least a name or price
                const validProds = Array.isArray(prods) 
                    ? prods.filter(p => p.name || p.productName || p.price > 0)
                    : [];

                setProducts(validProds);
                setOrders(Array.isArray(ords) ? ords : []);
                setLoading(false);
            } catch (error) {
                console.error("Cloud Connection Error:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 3. REVENUE CALCULATION
    const calculateRevenue = () => {
        if (!Array.isArray(orders)) return 0;
        return orders.reduce((acc, curr) => {
            const value = curr.totalAmount || curr.totalPrice || 0;
            return acc + Number(value);
        }, 0);
    };

    // 4. SAFE FILTERING (FIXES THE "toLowerCase" CRASH)
    const filteredProducts = products.filter(p => {
        const name = p?.name || p?.productName || ""; 
        const category = p?.category || ""; 
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setEditId(null);
        setFormItem({ name: '', price: '', category: 'Electronics', brand: '', image: '' });
    };

    const handleEditClick = (product) => {
        setFormItem({
            name: product.name || product.productName || '',
            price: product.price || '',
            category: product.category || 'Electronics',
            brand: product.brand || '',
            image: product.image || ''
        });
        setEditId(product._id || product.id);
        setIsEditing(true);
        setShowModal(true);
    };

    // 5. VIEW ORDER LOGIC
    const handleViewOrder = async (orderId) => {
        try {
            const response = await fetch(`${ORDERS_URL}/${orderId}`);
            if (response.ok) {
                const data = await response.json();
                setSelectedOrder(data);
                setShowOrderModal(true);
            }
        } catch (error) {
            alert("Connection error while viewing order.");
        }
    };

    // 6. SAVE/UPDATE PRODUCT
    const handleSaveProduct = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_URL}/${editId}` : API_URL;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formItem)
            });

            if (response.ok) {
                const savedData = await response.json();
                if (isEditing) {
                    setProducts(products.map(p => (p._id || p.id) === editId ? savedData : p));
                } else {
                    setProducts([savedData, ...products]);
                }
                closeModal();
            }
        } catch (error) {
            alert("Save failed");
        }
    };

    // 7. ORDER STATUS UPDATE
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${ORDERS_URL}/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            alert("Failed to update status");
        }
    };

    // 8. DELETE PRODUCT
    const handleDelete = async (id) => {
        if (window.confirm("Delete this product?")) {
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    setProducts(products.filter(p => (p._id || p.id) !== id));
                }
            } catch (error) {
                alert("Delete failed");
            }
        }
    };

    if (loading) return <div className="admin-loading">Syncing with MongoDB Atlas...</div>;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header"><h2>MyStore Admin</h2></div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
                        <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>📦 Products</li>
                        <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>🛒 Orders</li>
                    </ul>
                </nav>
                <button className="logout-sidebar-btn" onClick={() => navigate('/')}>Logout</button>
            </aside>

            <main className="admin-main">
                <header className="main-header">
                    <h1>{activeTab.toUpperCase()}</h1>
                    {activeTab === 'products' && (
                        <div className="header-actions">
                            <input type="text" placeholder="Search..." className="search-bar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="add-prod-btn" onClick={() => { setIsEditing(false); setShowModal(true); }}>+ Add Product</button>
                        </div>
                    )}
                </header>

                {/* DASHBOARD VIEW */}
                {activeTab === 'dashboard' && (
                    <div className="stats-grid">
                        <div className="stat-card"><h3>Total Revenue</h3><p>₹ {calculateRevenue().toLocaleString('en-IN')}</p></div>
                        <div className="stat-card"><h3>Total Orders</h3><p>{orders.length}</p></div>
                        <div className="stat-card"><h3>Live Products</h3><p>{products.length}</p></div>
                    </div>
                )}

                {/* PRODUCTS TABLE */}
                {activeTab === 'products' && (
                    <table className="admin-table">
                        <thead>
                            <tr><th>Product</th><th>Category</th><th>Price</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((prod) => (
                                <tr key={prod._id || prod.id}>
                                    <td className="prod-cell">
                                        <img src={prod.image || 'https://via.placeholder.com/50'} alt="" />
                                        <span>{prod.name || prod.productName || "Unnamed Product"}</span>
                                    </td>
                                    <td>{prod.category || "Uncategorized"}</td>
                                    <td>₹{Number(prod.price || 0).toLocaleString('en-IN')}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEditClick(prod)}>Edit</button>
                                        <button className="del-btn" onClick={() => handleDelete(prod._id || prod.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* ORDERS TABLE */}
                {activeTab === 'orders' && (
                    <table className="admin-table">
                        <thead>
                            <tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td><strong>{order.orderId || order._id?.substring(0, 8)}</strong></td>
                                    <td>{order.user?.name || "Guest"}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>₹{(order.totalAmount || 0).toLocaleString('en-IN')}</td>
                                    <td>
                                        <select className={`status-select ${order.status?.toLowerCase() || 'pending'}`} value={order.status || 'Pending'} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="view-btn" onClick={() => handleViewOrder(order._id)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* PRODUCT MODAL */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{isEditing ? 'Update Product' : 'Add New Product'}</h2>
                            <form onSubmit={handleSaveProduct}>
                                <input type="text" placeholder="Name" required value={formItem.name} onChange={(e) => setFormItem({...formItem, name: e.target.value})} />
                                <input type="number" placeholder="Price" required value={formItem.price} onChange={(e) => setFormItem({...formItem, price: e.target.value})} />
                                <input type="text" placeholder="Category" required value={formItem.category} onChange={(e) => setFormItem({...formItem, category: e.target.value})} />
                                <input type="text" placeholder="Image URL" value={formItem.image} onChange={(e) => setFormItem({...formItem, image: e.target.value})} />
                                <div className="modal-btns">
                                    <button type="submit" className="save-btn">{isEditing ? 'Update Changes' : 'Save Product'}</button>
                                    <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* ORDER DETAIL MODAL */}
                {showOrderModal && selectedOrder && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Order Details: {selectedOrder.orderId || selectedOrder._id?.substring(0,8)}</h2>
                            <hr />
                            <p><strong>Customer:</strong> {selectedOrder.user?.name || "Guest"}</p>
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Item Name</th><th>Qty</th><th>Subtotal</th></tr>
                                </thead>
                                <tbody>
                                    {(selectedOrder.items || []).map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name || item.productName || "Product"}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="cancel-btn" onClick={() => setShowOrderModal(false)} style={{marginTop: '10px', width: '100%'}}>Close Order View</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}