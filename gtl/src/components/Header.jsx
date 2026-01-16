import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary-600 flex-shrink-0 border-b-2 border-primary-700 p-4 md:p-5 shadow-lg"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="bg-white p-2 md:p-3 rounded-lg shadow-md">
            <h1 className="text-2xl md:text-4xl font-black italic text-primary-600 tracking-tighter">GTL</h1>
          </div>
          <div className="h-8 md:h-12 w-0.5 bg-white/50 rounded-full hidden sm:block"></div>
          <div className="hidden sm:block">
            <p className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">
              Gateway Trans Logistic
            </p>
            <p className="text-[10px] md:text-xs text-white/90 font-semibold uppercase mt-1">Safe & Fast Delivery</p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FaSun className="text-white text-xl" />
          ) : (
            <FaMoon className="text-white text-xl" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
