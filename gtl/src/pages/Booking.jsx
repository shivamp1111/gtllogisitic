import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaInfoCircle, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const Booking = () => {
  const [formData, setFormData] = useState({
    material: '',
    weight: '',
    loadType: '',
    vehicle: '',
    fromCity: '',
    fromAddress: '',
    toCity: '',
    toAddress: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const selectLoadType = (type) => {
    setFormData(prev => ({ ...prev, loadType: type }));
    setError('');
  };

  const selectVehicle = (vehicle) => {
    setFormData(prev => ({ ...prev, vehicle }));
    setError('');
  };

  const validateAndSend = () => {
    const { material, weight, loadType, vehicle, fromAddress, toAddress, toCity } = formData;

    if (!material || material.length < 2 || material.toLowerCase() === 'dhoni') {
      setError('ERROR: PLEASE ENTER PARCEL NAME.');
      return;
    }

    if (!weight || !/\d/.test(weight)) {
      setError('ERROR: PLEASE ENTER WEIGHT.');
      return;
    }

    if (!loadType || !vehicle) {
      setError('ERROR: PLEASE SELECT LOAD AND VEHICLE.');
      return;
    }

    if (fromAddress.length < 10 || toAddress.length < 10) {
      setError('ERROR: PLEASE WRITE FULL ADDRESS (House No, Area).');
      return;
    }

    const allowedStates = ['mh', 'gj', 'rj', 'maharashtra', 'gujarat', 'rajasthan', 
      'mumbai', 'pune', 'surat', 'vapi', 'ahmedabad', 'bikaner', 'jaipur', 'jodhpur', 
      'ajmer', 'sikar', 'kota', 'alwar'];
    const blockedCities = ['chennai', 'bengaluru', 'bangalore', 'hyderabad', 'delhi', 'kolkata'];

    if (loadType === 'Part Load') {
      const isBlocked = blockedCities.some(c => toCity.toLowerCase().includes(c));
      const isAllowed = allowedStates.some(s => toCity.toLowerCase().includes(s));

      if (isBlocked || !isAllowed) {
        setError('ERROR: PART LOAD SERVICE IS AVAILABLE IN STATE OF MAHARASHTRA, GUJRAT AND RAJASTHAN ONLY FOR ALL OVER INDIA DELIVERY SELECT FULL LOAD.');
        return;
      }
    }

    const msg = `*GTL INQUIRY*%0A*Mat:* ${material.toUpperCase()}%0A*Weight:* ${weight.toUpperCase()}%0A*Load:* ${loadType}%0A*Vehicle:* ${vehicle}%0A*From:* ${fromAddress}%0A*To:* ${toAddress}`;
    window.open(`https://wa.me/7023651572?text=${msg}`, '_blank');
    setSuccess(true);
    setTimeout(() => {
      setFormData({
        material: '', weight: '', loadType: '', vehicle: '',
        fromCity: '', fromAddress: '', toCity: '', toAddress: ''
      });
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-warning-50 dark:bg-warning-900/20 border-2 border-warning-500 p-4 rounded-xl mb-6 shadow-md"
      >
        <div className="flex items-center gap-2 mb-2">
          <FaExclamationTriangle className="text-warning-600" />
          <p className="font-black text-warning-700 dark:text-warning-300 text-sm uppercase">Important Notice</p>
        </div>
        <p className="text-warning-800 dark:text-warning-200 text-sm">"Full Load All Over India".</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 p-4 rounded-xl mb-8 shadow-md"
      >
        <div className="flex items-center gap-2">
          <FaInfoCircle className="text-primary-600" />
          <p className="font-black text-primary-700 dark:text-primary-300 text-sm uppercase">
            "To Get a Fare Amount of Your Parcel Just Fill the Form or Contact Us"
          </p>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-black text-slate-900 dark:text-slate-100 uppercase mb-6 border-l-4 border-primary-600 pl-4"
      >
        Inquiry Form
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            placeholder="Parcel Name (e.g. Drums, Box)"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all shadow-sm"
          />
        </div>

        <div>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Total Weight (e.g. 10 Tons)"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 transition-colors"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 uppercase">Load Type</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Part Load', 'Full Load'].map((type) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectLoadType(type)}
                className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                  formData.loadType === type
                    ? 'bg-primary-600 border-primary-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                <p className="font-bold text-center">{type}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 uppercase">Vehicle Type</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['Pickup (2.5T)', 'Small (7T)', 'Medium (16T)', 'Large (25T)'].map((v) => (
              <motion.div
                key={v}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectVehicle(v)}
                className={`p-3 rounded-lg cursor-pointer transition-all border-2 text-sm ${
                  formData.vehicle === v
                    ? 'bg-secondary-600 border-secondary-700 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20'
                }`}
              >
                <p className="font-bold text-center">{v.toUpperCase()}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 uppercase">Pickup Location</p>
          <input
            type="text"
            name="fromCity"
            value={formData.fromCity}
            onChange={handleInputChange}
            placeholder="From City"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 transition-colors"
          />
          <textarea
            name="fromAddress"
            value={formData.fromAddress}
            onChange={handleInputChange}
            placeholder="Full Pickup Address"
            rows="3"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 transition-colors resize-none"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 uppercase">Delivery Location</p>
          <input
            type="text"
            name="toCity"
            value={formData.toCity}
            onChange={handleInputChange}
            placeholder="To City"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 transition-colors"
          />
          <textarea
            name="toAddress"
            value={formData.toAddress}
            onChange={handleInputChange}
            placeholder="Full Delivery Address"
            rows="3"
            className="w-full p-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-sm mb-6 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-primary-500 transition-colors resize-none"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 p-4 rounded-lg text-sm font-black border-2 border-accent-500 text-center"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-success-600 text-white p-4 rounded-lg text-sm font-black shadow-md text-center flex items-center justify-center gap-2"
            >
              <FaCheckCircle /> Inquiry sent successfully! Check WhatsApp.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={validateAndSend}
          className="w-full bg-primary-600 text-white font-black py-4 rounded-lg uppercase text-sm shadow-md hover:shadow-lg hover:scale-[1.02] hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
        >
          <FaPaperPlane /> Send Inquiry
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Booking;

