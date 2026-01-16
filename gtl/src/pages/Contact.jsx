import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const contacts = [
    { type: 'phone', number: '7023651572', icon: FaPhone, color: 'bg-primary-600', hoverColor: 'hover:bg-primary-700' },
    { type: 'phone', number: '9921214623', icon: FaPhone, color: 'bg-secondary-600', hoverColor: 'hover:bg-secondary-700' },
    { type: 'phone', number: '9921214629', icon: FaPhone, color: 'bg-success-600', hoverColor: 'hover:bg-success-700' },
    { type: 'email', email: 'gatewaytranslogistic@gmail.com', icon: FaEnvelope, color: 'bg-warning-600', hoverColor: 'hover:bg-warning-700' }
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
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase mb-8 border-l-4 border-primary-600 pl-4"
      >
        Contact Us
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={index}
              href={contact.type === 'phone' ? `tel:${contact.number}` : `mailto:${contact.email}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${contact.color} ${contact.hoverColor} p-6 rounded-lg text-center text-white shadow-md hover:shadow-lg transition-all flex flex-col items-center gap-3`}
            >
              <Icon className="text-3xl" />
              <span className="font-black text-lg">
                {contact.type === 'phone' ? contact.number : contact.email}
              </span>
              <span className="text-sm opacity-90">
                {contact.type === 'phone' ? 'Click to Call' : 'Click to Email'}
              </span>
            </motion.a>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-success-50 dark:bg-success-900/20 border-2 border-success-500 p-6 rounded-lg mb-4 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-3">
          <FaWhatsapp className="text-success-600 text-2xl" />
          <p className="font-black text-success-700 dark:text-success-300 text-lg uppercase">WhatsApp Support</p>
        </div>
        <motion.a
          href="https://wa.me/7023651572"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-success-600 hover:bg-success-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
        >
          Chat on WhatsApp
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 p-6 rounded-lg shadow-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaClock className="text-primary-600 text-2xl" />
          <p className="font-black text-primary-700 dark:text-primary-300 text-lg uppercase">Customer Service Hours</p>
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-base">24/7 Available - We're always here to help you!</p>
      </motion.div>
    </div>
  );
};

export default Contact;

