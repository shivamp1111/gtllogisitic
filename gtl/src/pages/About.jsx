import { motion } from 'framer-motion';
import { FaTruck, FaWarehouse, FaMapMarkedAlt, FaLaptopCode, FaLeaf, FaAward, FaUsers, FaChartLine } from 'react-icons/fa';

const About = () => {
  const extraServices = [
    'Priority Industrial Express',
    'Multi-Point Consolidation',
    'Dedicated Key-Account Mgmt',
    'Secure Bonded Trucking',
    'Heavy-Lift Project Logistics',
    'Digital E-POD Solutions',
    'Strategic Inventory Buffering'
  ];

  const sections = [
    {
      icon: FaAward,
      title: 'Our Journey',
      content: `Established in 2010, Gateway Trans Logistic (GTL) has consistently redefined the landscape 
      of industrial transportation through its dedication to reliability and customer-centric values. 
      Over the past fifteen years, we have grown from a modest fleet operation into a nationwide 
      logistics powerhouse, specializing in the high-demand corridors of Western and Northern India. 
      Our journey began with a simple mission: to provide a seamless bridge between manufacturers 
      and their markets while ensuring the highest standards of cargo safety and delivery speed.`
    },
    {
      icon: FaTruck,
      title: 'Our Fleet',
      content: `At the heart of GTL's operational excellence is our massive fleet of over 500 owned and 
      strictly managed containerized vehicles, designed to handle diverse industrial requirements. 
      We take immense pride in maintaining one of the youngest and most technologically advanced 
      fleets in the sector, ensuring that every trip is characterized by safety and speed. Our 
      vehicles are equipped with reinforced steel bodies and advanced weather-proofing systems 
      to protect your cargo from the unpredictable environmental challenges of the Indian roads.`
    },
    {
      icon: FaMapMarkedAlt,
      title: 'Strategic Network',
      content: `GTL's strategic advantage lies in our deep-rooted network and presence across the critical 
      industrial hubs of Maharashtra, Gujarat, and Rajasthan, forming a powerful West-North corridor. 
      Our headquarters in Bhiwandi serves as a central nerve center, coordinating movements across 
      our regional offices in Vapi, Ankleshwar, Vadodara, and Ahmedabad for seamless service. This 
      localized expertise allows us to navigate regional regulations, tax compliance, and border 
      protocols with unmatched efficiency.`
    },
    {
      icon: FaLaptopCode,
      title: 'Digital Innovation',
      content: `Innovation and digital transformation are the pillars that support GTL's vision for a modern, 
      transparent, and data-driven logistics experience for all our corporate clients. We have 
      integrated advanced GPS tracking systems across our entire fleet, providing real-time visibility 
      that was once considered impossible in the traditional transport sector. Our digital portal 
      allows you to monitor the status of your shipments, download electronic proof of deliveries 
      (e-PODs), and manage your logistics data with total ease.`
    },
    {
      icon: FaLeaf,
      title: 'Sustainability & Responsibility',
      content: `Our commitment to sustainability and corporate responsibility is what defines the GTL culture 
      and guides our long-term strategy for a greener and safer future in logistics. We recognize 
      the environmental impact of large-scale transportation and are actively taking steps to reduce 
      our carbon footprint through fleet modernization and smarter routing. Our drivers are trained 
      in fuel-efficient driving techniques, and we are gradually transitioning to low-emission 
      vehicles to contribute to a cleaner environment for future generations.`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase mb-8 border-l-4 border-primary-600 pl-4"
      >
        About Us
      </motion.h2>

      <div className="space-y-6 mb-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const colors = [
            'bg-primary-600 border-primary-700',
            'bg-secondary-600 border-secondary-700',
            'bg-success-600 border-success-700',
            'bg-warning-600 border-warning-700',
            'bg-primary-600 border-primary-700'
          ];
          const colorClass = colors[index % colors.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className={`${colorClass} border-2 p-6 md:p-8 rounded-xl shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-white text-3xl" />
                <h3 className="text-white font-black text-xl md:text-2xl">{section.title}</h3>
              </div>
              <p className="text-white font-semibold text-sm md:text-base leading-relaxed text-justify">
                {section.content}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 p-6 md:p-8 rounded-xl shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <FaAward className="text-secondary-600 text-2xl" />
          <p className="font-black text-secondary-600 uppercase text-lg">GTL Extra Services</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {extraServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-3 rounded-lg"
            >
              <span className="text-primary-600 font-black">{index + 1}.</span>
              <span className="text-slate-900 dark:text-slate-100 text-sm font-semibold">{service}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;

