import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding } from 'react-icons/fa';

const Branches = () => {
  const branches = [
    {
      name: 'BHIWANDI (HO)',
      address: 'Godown No. 1, Moreshwar Compound, Near Rahanal Bus Stop, Rahanal Village, Bhiwandi, MH-421302.',
      icon: FaBuilding
    },
    {
      name: 'VAPI BRANCH',
      address: 'Panchmukhi Complex - 2 Phase, Near NR Agarwal Paper Mill Oop.Flem Tech, Vapi, GIDC - 396191.',
      icon: FaBuilding
    },
    {
      name: 'ANKLESHWAR BRANCH',
      address: 'Godown No. 1, VR Complex, Near Dyastar, GIDC Ankleshwar-393001.',
      icon: FaBuilding
    },
    {
      name: 'VADODARA BRANCH',
      address: 'Plot No. C-239, Nilkantheshwar Estate, B/H Jai Jalaram Weigh Bridge, N.H.No.8 Darjipura Vadodara-390022.',
      icon: FaBuilding
    },
    {
      name: 'AHMEDABAD BRANCH',
      address: 'Godown No. 23, Bhagwan Estate, B/H Ekta Hotel, Aslali Ahmedabad-382427.',
      icon: FaBuilding
    }
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
    <div className="max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase mb-8 border-l-4 border-primary-600 pl-4"
      >
        Our Network
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {branches.map((branch, index) => {
          const Icon = branch.icon;
          const colors = [
            { bg: 'bg-primary-600', text: 'text-primary-600', border: 'hover:border-primary-400' },
            { bg: 'bg-secondary-600', text: 'text-secondary-600', border: 'hover:border-secondary-400' },
            { bg: 'bg-success-600', text: 'text-success-600', border: 'hover:border-success-400' },
            { bg: 'bg-warning-600', text: 'text-warning-600', border: 'hover:border-warning-400' },
            { bg: 'bg-primary-600', text: 'text-primary-600', border: 'hover:border-primary-400' }
          ];
          const colorSet = colors[index % colors.length];
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 rounded-lg ${colorSet.border} transition-all shadow-sm hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className={`${colorSet.bg} rounded-full p-3 mt-1 shadow-md`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className={`${colorSet.text} font-black text-lg md:text-xl mb-2 uppercase`}>
                    {branch.name}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 p-4 rounded-lg shadow-sm"
      >
        <p className="text-primary-700 dark:text-primary-300 text-sm font-semibold text-center">
          Visit any of our branches for personalized service and support
        </p>
      </motion.div>
    </div>
  );
};

export default Branches;

