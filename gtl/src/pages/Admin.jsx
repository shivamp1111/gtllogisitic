import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ref, push, set, get, remove, onValue } from 'firebase/database';
import { database } from '../firebase/config';
import {
  FaSignInAlt, FaSignOutAlt, FaPlus, FaTrash, FaEdit, FaTruck,
  FaChartLine, FaUsers, FaDownload, FaSearch, FaFilter, FaSpinner,
  FaCheckCircle, FaTimesCircle, FaCalendarAlt
} from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Admin = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    lr: '',
    status: 'In Transit',
    route: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (user) {
      loadShipments();
    }
  }, [user]);

  useEffect(() => {
    filterShipments();
  }, [shipments, searchTerm, statusFilter]);

  const loadShipments = () => {
    const shipmentsRef = ref(database, 'shipments');
    onValue(shipmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const shipmentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setShipments(shipmentsList.reverse());
      } else {
        setShipments([]);
      }
    });
  };

  const filterShipments = () => {
    let filtered = [...shipments];

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.lr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.route?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(s => s.status === statusFilter);
    }

    setFilteredShipments(filtered);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setLoginError('Invalid credentials. Use: admin@gtl.com / admin123');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.lr) {
      alert('Please enter LR Number');
      return;
    }

    // Validate LR Number format (alphanumeric only to be safe as key)
    const lrRegex = /^[a-zA-Z0-9]+$/;
    if (!lrRegex.test(formData.lr)) {
      alert('LR Number can only contain letters and numbers.');
      return;
    }

    try {
      const shipmentPath = `shipments/${formData.lr}`; // Use LR as key

      // Check if exists if adding new (optional but good) - for now just set to overwrite/update
      // If editing, we might need to handle ID change if they edit LR number, 
      // but let's assume LR number editing might need delete-then-add logic if we wanted to be strict.
      // For potential simplicity, we treat it as create-or-update.

      if (editingShipment && editingShipment.lr !== formData.lr) {
        // If LR changed during edit, we might want to remove old one?
        // For now, let's keep it simple as "Update/Set"
        // If ID was the key, we should rely on ID. 
        // Since we are changing schema to Key=LR, 'id' in local state will be LR.
        // So if they change LR, it creates a NEW entry. 
        // Let's just handle the create/update case.
      }

      await set(ref(database, shipmentPath), formData);

      setFormData({ lr: '', status: 'In Transit', route: '', date: new Date().toISOString().split('T')[0] });
      setShowAddForm(false);
      setEditingShipment(null);
    } catch (error) {
      alert('Error saving shipment: ' + error.message);
    }
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setFormData({
      lr: shipment.lr || '',
      status: shipment.status || 'In Transit',
      route: shipment.route || '',
      date: shipment.date || new Date().toISOString().split('T')[0]
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shipment?')) {
      try {
        await remove(ref(database, `shipments/${id}`));
      } catch (error) {
        alert('Error deleting shipment: ' + error.message);
      }
    }
  };

  const cancelEdit = () => {
    setEditingShipment(null);
    setFormData({ lr: '', status: 'In Transit', route: '', date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  const exportToCSV = () => {
    const headers = ['LR Number', 'Status', 'Route', 'Date'];
    const rows = shipments.map(s => [
      s.lr || '',
      s.status || '',
      s.route || '',
      s.date || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtl-shipments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getChartData = () => {
    const statusCounts = shipments.reduce((acc, s) => {
      const status = s.status || 'Unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map(key => ({
      name: key,
      count: statusCounts[key]
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 p-8 rounded-xl shadow-lg max-w-md w-full"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">GTL</h1>
            <p className="text-slate-900 dark:text-slate-100 text-sm uppercase">Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gtl.com"
                className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                className="w-full p-3 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                required
                autoComplete="current-password"
              />
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800  dark:border-white text-slate-900 dark:text-slate-100 p-3 rounded-xl text-sm"
              >
                {loginError}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary-600 text-white font-black py-3 rounded-xl uppercase hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 "
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>Login</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 dark:border-primary-600 rounded-xl">
            <p className="text-primary-600 dark:text-primary-400 text-xs text-center">
              Default credentials: admin@gtl.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = {
    total: shipments.length,
    delivered: shipments.filter(s => s.status === 'Delivered').length,
    inTransit: shipments.filter(s => s.status === 'In Transit').length,
    pending: shipments.filter(s => s.status === 'Pending').length
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 p-6 rounded-xl mb-6 shadow-xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-primary-600 dark:text-primary-400 mb-2">Admin Dashboard</h1>
              <p className="text-slate-900 dark:text-slate-100 text-sm">Manage shipments and track logistics</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:bg-primary-600 dark:hover:bg-primary-600 dark:hover:text-white transition-colors flex items-center gap-2  dark:border-white"
            >
              <FaSignOutAlt />
              Logout
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            { icon: FaTruck, label: 'Total Shipments', value: stats.total, color: 'bg-primary-600' },
            { icon: FaCheckCircle, label: 'Delivered', value: stats.delivered, color: 'bg-success-600' },
            { icon: FaTruck, label: 'In Transit', value: stats.inTransit, color: 'bg-warning-600' },
            { icon: FaUsers, label: 'Pending', value: stats.pending, color: 'bg-secondary-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${stat.color} p-6 rounded-xl text-white shadow-xl hover:shadow-lg transition-all `}
              >
                <Icon className="text-3xl mb-2" />
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-sm font-semibold opacity-90">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 p-6 rounded-xl mb-6 shadow-lg"
        >
          <h2 className="text-2xl font-black text-primary-600 dark:text-primary-400 mb-4">Analytics</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Bar dataKey="count" fill="#EAB308" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h2 className="text-2xl font-black text-primary-600 dark:text-primary-400">Shipments Management</h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToCSV}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <FaDownload />
                Export CSV
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddForm(true);
                  setEditingShipment(null);
                  setFormData({ lr: '', status: 'In Transit', route: '', date: new Date().toISOString().split('T')[0] });
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-bold hover:shadow-lg hover:bg-primary-700 transition-all flex items-center gap-2"
              >
                <FaPlus />
                Add New LR
              </motion.button>
            </div>
          </div>

          <div className="mb-4 flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-900 dark:text-slate-100" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by LR or Route..."
                  className="w-full pl-10 p-3 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-3 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
              <option value="Out for Delivery">Out for Delivery</option>
            </select>
          </div>

          <AnimatePresence>
            {showAddForm && (
              <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl mb-4 border-2 border-primary-500 dark:border-primary-600"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">LR Number *</label>
                    <input
                      type="text"
                      value={formData.lr}
                      onChange={(e) => setFormData({ ...formData, lr: e.target.value })}
                      className="w-full p-2 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500"
                    >
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pending">Pending</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">Route</label>
                    <input
                      type="text"
                      value={formData.route}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                      placeholder="e.g., Mumbai to Ahmedabad"
                      className="w-full p-2 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-primary-600 dark:text-primary-400 text-sm font-bold mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-2 bg-white dark:bg-slate-800 border-2 border-primary-500 dark:border-primary-600 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg "
                  >
                    {editingShipment ? 'Update' : 'Save'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={cancelEdit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl font-bold hover:bg-primary-600 hover:text-white transition-colors  dark:border-white"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-500 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20">
                  <th className="p-3 text-primary-600 dark:text-primary-400 font-black">LR Number</th>
                  <th className="p-3 text-primary-600 dark:text-primary-400 font-black">Status</th>
                  <th className="p-3 text-primary-600 dark:text-primary-400 font-black">Route</th>
                  <th className="p-3 text-primary-600 dark:text-primary-400 font-black">Date</th>
                  <th className="p-3 text-primary-600 dark:text-primary-400 font-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-slate-900 dark:text-slate-100">
                      {shipments.length === 0 ? 'No shipments found. Add your first shipment!' : 'No shipments match your filters.'}
                    </td>
                  </tr>
                ) : (
                  filteredShipments.map((shipment) => (
                    <motion.tr
                      key={shipment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <td className="p-3 text-slate-900 dark:text-slate-100 font-semibold">{shipment.lr}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${shipment.status === 'Delivered' ? 'bg-primary-600 text-white' :
                          shipment.status === 'In Transit' ? 'bg-primary-600 text-white' :
                            shipment.status === 'Pending' ? 'bg-primary-600 text-white' :
                              'bg-primary-600 text-white'
                          }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-900 dark:text-slate-100">{shipment.route || 'N/A'}</td>
                      <td className="p-3 text-slate-900 dark:text-slate-100">{shipment.date || 'N/A'}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEdit(shipment)}
                            className="bg-primary-600 text-white p-2 rounded hover:bg-primary-700 transition-colors "
                            title="Edit"
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(shipment.id)}
                            className="bg-black dark:bg-white text-white dark:text-black p-2 rounded hover:bg-primary-600 hover:text-white transition-colors  dark:border-white"
                            title="Delete"
                          >
                            <FaTrash />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;

