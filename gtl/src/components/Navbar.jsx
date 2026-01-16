import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, FaQuestionCircle, FaMapMarkerAlt, FaClipboardList, 
  FaBuilding, FaPhone, FaInfoCircle, FaStar, FaBars, FaTimes,
  FaSignInAlt, FaSignOutAlt, FaUserShield
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/why-us', label: 'Why Us', icon: FaQuestionCircle },
    { path: '/tracking', label: 'Tracking', icon: FaMapMarkerAlt },
    { path: '/booking', label: 'Booking', icon: FaClipboardList },
    { path: '/features', label: 'Features', icon: FaStar },
    { path: '/branches', label: 'Branches', icon: FaBuilding },
    { path: '/contact', label: 'Contact', icon: FaPhone },
    { path: '/about', label: 'About', icon: FaInfoCircle },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      setShowAdminLogin(false);
      setEmail('');
      setPassword('');
      navigate('/admin');
    } else {
      setLoginError('Invalid credentials');
    }
    
    setLoginLoading(false);
  };

  const handleAdminLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="bg-white p-2 rounded-lg shadow-md">
              <span className="text-2xl font-black italic text-primary-600">GTL</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Gateway Trans Logistic</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavClick(item.path)}
                  className={`
                    relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200
                    flex items-center gap-2
                    ${active
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'text-white hover:text-white hover:bg-white/20'
                    }
                  `}
                >
                  <Icon className="text-sm" />
                  <span>{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Admin Login/Logout */}
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('/admin')}
                className="px-4 py-2 rounded-lg font-semibold text-sm bg-white text-primary-600 flex items-center gap-2 ml-2 shadow-md hover:shadow-lg"
              >
                <FaUserShield />
                <span>Admin</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="px-4 py-2 rounded-lg font-semibold text-sm bg-white text-primary-600 flex items-center gap-2 ml-2 shadow-md hover:shadow-lg"
              >
                <FaSignInAlt />
                <span>Admin</span>
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Admin Login Dropdown */}
      <AnimatePresence>
        {showAdminLogin && !user && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-full mt-2 bg-white border-2 border-slate-200 shadow-xl rounded-lg p-4 w-80 z-50"
          >
            <h3 className="text-lg font-black text-primary-600 mb-3 flex items-center gap-2">
              <FaUserShield /> Admin Login
            </h3>
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border-2 border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border-2 border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                required
              />
              {loginError && (
                <p className="text-sm text-white bg-accent-500 border-2 border-accent-600 p-2 rounded">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary-600 text-white font-black py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-md"
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-800 border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all
                      ${active
                        ? 'bg-white text-primary-600 shadow-md'
                        : 'text-white hover:bg-white/20'
                      }
                    `}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
              {user ? (
                <motion.button
                  onClick={() => handleNavClick('/admin')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm bg-white text-primary-600"
                >
                  <FaUserShield />
                  <span>Admin Panel</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm bg-white text-primary-600"
                >
                  <FaSignInAlt />
                  <span>Admin Login</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
