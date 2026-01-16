import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const contacts = [
    { type: 'phone', number: '7023651572', icon: FaPhone, bgColor: 'bg-primary-600', hoverColor: 'hover:bg-primary-700' },
    { type: 'phone', number: '9921214623', icon: FaPhone, bgColor: 'bg-secondary-600', hoverColor: 'hover:bg-secondary-700' },
    { type: 'phone', number: '9921214629', icon: FaPhone, bgColor: 'bg-success-600', hoverColor: 'hover:bg-success-700' },
    { type: 'email', email: 'gatewaytranslogistic@gmail.com', icon: FaEnvelope, bgColor: 'bg-warning-600', hoverColor: 'hover:bg-warning-700' }
  ];

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-primary-700 border-t-2 border-primary-800 p-3 md:p-4 shadow-lg"
    >
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 px-4 max-w-7xl mx-auto">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={index}
              href={contact.type === 'phone' ? `tel:${contact.number}` : `mailto:${contact.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 text-white transition-all flex-shrink-0 ${contact.bgColor} ${contact.hoverColor} px-4 md:px-5 py-2 md:py-2.5 rounded-lg shadow-md`}
            >
              <Icon className="text-white text-base md:text-lg" />
              <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">
                {contact.type === 'phone' ? contact.number : contact.email}
              </span>
            </motion.a>
          );
        })}
        <motion.a
          href="https://wa.me/7023651572"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-white transition-all flex-shrink-0 bg-success-600 hover:bg-success-700 px-4 md:px-5 py-2 md:py-2.5 rounded-lg shadow-md"
        >
          <FaWhatsapp className="text-white text-base md:text-xl" />
          <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">WhatsApp</span>
        </motion.a>
      </div>
    </motion.footer>
  );
};

export default Footer;

