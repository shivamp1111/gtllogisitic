import { motion } from 'framer-motion';
import { FaTruck, FaBox, FaWarehouse, FaUsers, FaShieldAlt, FaClock, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  const services = [
    'Full Load Truck Service',
    'Part Load Truck Service',
    'Loading & Unloading Service',
    'Express Urgent Delivery',
    'Door to Door Service',
    'GPS System in All Vehicle',
    'Container Body in all Truck',
    'Expert Staff',
    '24/7 Customer Service Available',
    'Reliable and Cost Effective Service',
    'Intime Delivery',
    'All Over India Delivery for Full Load Vehicle',
    'We Strive For Excellence',
    'Track Your Parcel By Using Our Latest Technology',
    'Delivery in State of Maharashtra, Gujarat and Rajasthan for Part Load Truck',
    '10+ Own Warehouse for Keeping Your Goods Safe',
    '15+ Own Vehicle',
    '200+ Staff to Help you',
    'Satisfied 10,000+ Client',
    'All Type of Vehicle'
  ];

  const stats = [
    { icon: FaTruck, number: '15+', label: 'Own Vehicles', color: 'bg-primary-600' },
    { icon: FaWarehouse, number: '10+', label: 'Warehouses', color: 'bg-secondary-600' },
    { icon: FaUsers, number: '200+', label: 'Expert Staff', color: 'bg-success-600' },
    { icon: FaBox, number: '10,000+', label: 'Satisfied Clients', color: 'bg-warning-600' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase mb-3 border-l-4 border-primary-600 pl-4">
          Welcome to Gateway Trans Logistic (GTL)
        </h1>
        <p className="text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400 ml-5 mb-6 uppercase">
          India's Most Safest & Fastest Logistic
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-600 border-2 border-primary-700 p-6 md:p-8 rounded-xl shadow-lg mb-8"
      >
        <p className="text-white font-semibold text-base md:text-lg leading-relaxed text-justify">
          At Gateway Trans Logistic, we don't just move boxes; we carry the heartbeat of your business. 
          Every mile we cover is a promise of reliability and every delivery is a testament to our precision. 
          Our infrastructure is built on the foundation of safety, powered by a dedicated team that treats 
          your cargo as their own. From the first inquiry to the final signature, experience a logistics 
          partnership that prioritizes your peace of mind above all else. We are the engine behind your 
          supply chain excellence.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${stat.color} p-6 rounded-xl text-center text-white shadow-md`}
            >
              <Icon className="text-4xl mb-3 mx-auto" />
              <div className="text-3xl font-black mb-1">{stat.number}</div>
              <div className="text-sm font-semibold">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-success-100 dark:bg-success-900/30 border-2 border-success-500 p-4 rounded-xl mb-6 shadow-md"
      >
        <p className="font-black text-success-700 dark:text-success-300 text-sm uppercase text-center">
          "Moving Goods is Easy, Moving Trust What We Do"
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-warning-50 dark:bg-warning-900/20 border-2 border-warning-500 p-4 rounded-xl mb-8 shadow-md"
      >
        <p className="font-black text-warning-700 dark:text-warning-300 text-sm uppercase mb-2 flex items-center gap-2">
          <FaShieldAlt /> Important Notice
        </p>
        <p className="text-warning-800 dark:text-warning-200 text-xs leading-tight">
          All India Delivery is Available Only For Full Load Vehicle and For Part Load Vehicle 
          Delivery is Available Only in State of Maharashtra, Gujarat and Rajasthan.
        </p>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 uppercase mb-6 border-l-4 border-primary-600 pl-4"
      >
        Our Premium Services
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 5 }}
            className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm hover:shadow-md hover:border-primary-400 transition-all"
          >
            <FaCheckCircle className="text-success-500 text-lg flex-shrink-0" />
            <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold">{service}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;

