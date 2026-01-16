import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';
import { FaSearch, FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaRoute, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Tracking = () => {
  const [lrNumber, setLrNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = async () => {
    const lrNo = lrNumber.trim();
    
    if (!lrNo) {
      setError('Please enter an LR Number');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const snapshot = await get(ref(database, `shipments/${lrNo}`));
      
      if (snapshot.exists()) {
        setTrackingData(snapshot.val());
      } else {
        setError('LR Number not found! Please check and try again.');
      }
    } catch (err) {
      setError('Error fetching tracking information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchStatus();
    }
  };

  const getStatusColor = (status) => {
    return 'bg-primary-600';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-600 border-2 border-primary-700 p-8 rounded-xl shadow-lg mb-6"
      >
        <h3 className="text-white mb-6 text-2xl uppercase font-black text-center flex items-center justify-center gap-3">
          <FaTruck className="text-3xl" />
          Track Your Shipment
        </h3>

        <div className="relative mb-4">
          <input
            type="text"
            value={lrNumber}
            onChange={(e) => setLrNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter LR Number"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-400 text-lg font-semibold"
            disabled={loading}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={fetchStatus}
          disabled={loading}
          className="w-full bg-primary-600 text-white rounded-lg font-black py-4 uppercase text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:bg-primary-700 transition-all"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Tracking...</span>
            </>
          ) : (
            <>
              <FaSearch />
              <span>Track Now</span>
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-accent-50 dark:bg-accent-900/20 border-2 border-accent-500 rounded-lg text-accent-700 dark:text-accent-300 text-sm flex items-center gap-2"
            >
              <FaTimesCircle /> {error}
            </motion.div>
          )}

          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div className={`${getStatusColor(trackingData.status)} p-6 rounded-lg text-white shadow-md`}>
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="text-2xl" />
                  <div>
                    <p className="text-sm font-semibold opacity-90">Status</p>
                    <p className="text-2xl font-black">{trackingData.status || 'In Transit'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-primary-600 text-xl" />
                    <div>
                      <p className="text-primary-600 font-bold text-xs mb-1">LR Number</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{trackingData.lr || lrNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaRoute className="text-secondary-600 text-xl" />
                    <div>
                      <p className="text-secondary-600 font-bold text-xs mb-1">Route</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{trackingData.route || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg md:col-span-2">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-success-600 text-xl" />
                    <div>
                      <p className="text-success-600 font-bold text-xs mb-1">Date of Booking</p>
                      <p className="text-slate-900 dark:text-slate-100 font-semibold">{trackingData.date || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 p-4 rounded-lg"
      >
        <p className="text-xs text-slate-700 dark:text-slate-300">
          <strong>Note:</strong> Enter your LR (Lorry Receipt) number to track your shipment in real-time.
        </p>
      </motion.div>
    </div>
  );
};

export default Tracking;

