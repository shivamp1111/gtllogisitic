import { motion } from 'framer-motion';
import { 
  FaTruck, FaBox, FaWarehouse, FaUsers, FaClock, FaShieldAlt, 
  FaMapMarkerAlt, FaPhone, FaCheckCircle, FaRoute, FaLock, 
  FaTachometerAlt, FaHandshake, FaCertificate, FaGlobe
} from 'react-icons/fa';

const Features = () => {
  const mainFeatures = [
    {
      icon: FaTruck,
      title: 'Full Load Service',
      description: 'Complete truck dedicated to your cargo for maximum security and speed',
      color: 'bg-primary-600'
    },
    {
      icon: FaBox,
      title: 'Part Load Service',
      description: 'Cost-effective solution for smaller shipments in Maharashtra, Gujarat & Rajasthan',
      color: 'bg-secondary-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Zero Transshipment',
      description: 'Your cargo stays in the same truck from pickup to delivery - no shifting',
      color: 'bg-success-600'
    },
    {
      icon: FaLock,
      title: 'Weather-Proof Containers',
      description: '100% closed-body steel containers protecting your goods from all elements',
      color: 'bg-warning-600'
    },
    {
      icon: FaClock,
      title: 'Express Delivery',
      description: '48-hour delivery guarantee between major industrial hubs',
      color: 'bg-primary-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Real-Time GPS Tracking',
      description: '24/7 live tracking system with SMS and email alerts',
      color: 'bg-secondary-600'
    },
    {
      icon: FaRoute,
      title: 'Door-to-Door Service',
      description: 'Complete pickup and delivery service right at your doorstep',
      color: 'bg-success-600'
    },
    {
      icon: FaWarehouse,
      title: 'Secure Warehouses',
      description: '10+ owned warehouses for safe storage during transit',
      color: 'bg-warning-600'
    },
    {
      icon: FaUsers,
      title: 'Expert Team',
      description: '200+ trained staff members with 10+ years of experience',
      color: 'bg-primary-600'
    },
    {
      icon: FaPhone,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your logistics needs',
      color: 'bg-secondary-600'
    },
    {
      icon: FaTachometerAlt,
      title: 'Cost Effective',
      description: 'Competitive pricing without compromising on quality and safety',
      color: 'bg-success-600'
    },
    {
      icon: FaHandshake,
      title: 'Trusted Partner',
      description: 'Satisfied 10,000+ clients across India',
      color: 'bg-warning-600'
    }
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
        staggerChildren: 0.05
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
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase mb-4 border-l-4 border-primary-600 pl-4 inline-block">
          Our Premium Features
        </h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 font-semibold">
          Everything you need for safe, fast, and reliable logistics
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {mainFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`${feature.color} p-6 rounded-lg text-white shadow-md hover:shadow-lg transition-all`}
            >
              <Icon className="text-4xl mb-4" />
              <h3 className="font-black text-xl mb-2 uppercase">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className={`${stat.color} p-6 rounded-lg text-center text-white shadow-md`}
            >
              <Icon className="text-4xl mb-3 mx-auto" />
              <div className="text-4xl font-black mb-1">{stat.number}</div>
              <div className="text-sm font-semibold">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-primary-600 border-2 border-primary-700 p-8 rounded-xl mb-8 shadow-md"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaCertificate className="text-white text-3xl" />
          <h3 className="text-white font-black text-2xl uppercase">Why Choose Our Features?</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Safety First: Zero transshipment and weather-proof containers ensure your cargo arrives intact',
            'Speed & Efficiency: Express delivery options and optimized routes save you time',
            'Transparency: Real-time tracking keeps you informed every step of the way',
            'Reliability: 15+ years of experience and 10,000+ satisfied clients'
          ].map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-start gap-2"
            >
              <FaCheckCircle className="text-white text-xl mt-1 flex-shrink-0" />
              <p className="text-white text-sm">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 rounded-xl shadow-sm"
      >
        <h3 className="text-primary-600 font-black text-lg mb-4 uppercase flex items-center gap-2">
          <FaGlobe /> Service Coverage
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 p-4 rounded-lg">
            <p className="text-primary-700 dark:text-primary-300 font-bold mb-2">Full Load Service</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm">Available all over India</p>
          </div>
          <div className="bg-secondary-50 dark:bg-secondary-900/20 border-2 border-secondary-500 p-4 rounded-lg">
            <p className="text-secondary-700 dark:text-secondary-300 font-bold mb-2">Part Load Service</p>
            <p className="text-slate-700 dark:text-slate-300 text-sm">Maharashtra, Gujarat & Rajasthan</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;

