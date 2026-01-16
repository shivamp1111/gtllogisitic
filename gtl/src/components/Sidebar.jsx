import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, FaQuestionCircle, FaMapMarkerAlt, FaClipboardList, 
  FaBuilding, FaPhone, FaInfoCircle, FaStar
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <motion.nav
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-28 md:w-32 bg-white/80 dark:bg-dark-800/90 backdrop-blur-md flex-shrink-0 flex flex-col border-r-2 border-primary-200 dark:border-primary-800 shadow-xl"
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        return (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(item.path)}
            className={`
              relative px-3 py-4 text-left text-[10px] md:text-xs font-black uppercase cursor-pointer 
              border-b border-primary-200 dark:border-primary-800 transition-all duration-200 
              flex items-center gap-2 group
              ${active
                ? 'bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600 text-white shadow-xl border-r-4 border-white'
                : 'text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400'
              }
            `}
          >
            <Icon className={`text-base md:text-lg ${active ? 'text-white' : 'text-primary-500 dark:text-primary-400'}`} />
            <span className={active ? 'text-white font-black' : 'text-primary-700 dark:text-primary-300 font-bold'}>{item.label}</span>
            {active && (
              <motion.div
                layoutId="activeTab"
                className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
};

export default Sidebar;

