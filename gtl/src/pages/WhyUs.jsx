import { motion } from 'framer-motion';
import { FaShieldAlt, FaTruck, FaClock, FaMapMarkerAlt, FaCheckCircle, FaLock, FaRoute } from 'react-icons/fa';

const WhyUs = () => {
  const features = [
    { icon: FaShieldAlt, title: 'Zero Transshipment Guarantee', desc: 'No shifting material' },
    { icon: FaLock, title: '100% Weather-Proof', desc: 'Closed steel containers' },
    { icon: FaClock, title: '48-Hour Express', desc: 'Fastest MH-GJ-RJ belt' },
    { icon: FaShieldAlt, title: 'Industrial Safety', desc: 'Specialized lashing' },
    { icon: FaMapMarkerAlt, title: '24/7 GPS', desc: 'Real-time location alerts' },
    { icon: FaCheckCircle, title: 'No-Damage History', desc: 'Proven track record' },
    { icon: FaTruck, title: 'Verified Driver Network', desc: '10+ years experience' }
  ];

  const sections = [
    {
      icon: FaShieldAlt,
      title: 'Zero Transshipment Policy',
      content: `The hallmark of Gateway Trans Logistic is our unwavering commitment to the safety and security 
      of your industrial cargo through our specialized "Zero Transshipment" policy. Unlike traditional 
      transporters who shift goods between multiple trucks at various godowns, GTL ensures that once 
      your material is loaded at the origin, it remains untouched until it reaches the final destination. 
      This revolutionary approach drastically reduces the risk of scratches, breakages, or misplacement 
      of items, providing you with absolute peace of mind during the transit process.`
    },
    {
      icon: FaLock,
      title: '100% Weather-Proof Security',
      content: `Security is at the core of our operations, which is why we maintain a 100% weather-proof, 
      closed-body containerized fleet to protect your valuable shipments from external elements. 
      In a country like India, where monsoon rains and extreme dust can ruin industrial goods, 
      our specialized containers provide an impenetrable shield against the environment. Every 
      vehicle in our fleet is constructed with high-grade steel and features advanced locking 
      mechanisms to prevent theft and unauthorized access during long-haul journeys.`
    },
    {
      icon: FaClock,
      title: 'Express Transit System',
      content: `Time is the most critical currency in modern business, and GTL's "Express Transit" system 
      is engineered to provide the fastest delivery speeds in the Maharashtra-Gujarat-Rajasthan 
      corridor. We have optimized our route management using advanced AI-driven mapping to avoid 
      congested city centers and utilize the most efficient national highways available. Our team 
      of experienced drivers works in coordinated shifts to ensure that the wheels keep turning, 
      allowing for 48-hour delivery guarantees between major industrial hubs.`
    },
    {
      icon: FaMapMarkerAlt,
      title: '24/7 Live Tracking',
      content: `Transparency is the foundation of a modern supply chain, and GTL provides a state-of-the-art 
      24/7 live tracking system that gives you complete visibility over your cargo. From the moment 
      the LR is generated to the final point of delivery, you can monitor the exact GPS location of 
      your vehicle through our integrated digital portal. This real-time data allows your operations 
      team to plan for arrivals, manage inventory levels, and provide accurate updates to your own 
      end-customers without any guesswork.`
    },
    {
      icon: FaTruck,
      title: '15 Years of Expertise',
      content: `Our legacy of fifteen years in the industry has allowed us to build an unmatched expertise 
      in handling complex industrial logistics that other carriers simply cannot match. We have 
      survived and thrived through changing economic cycles by focusing on one thing: providing 
      customized solutions for every unique client requirement. Whether it is the specialized handling 
      of hazardous chemicals, the transport of over-dimensional cargo, or the management of sensitive 
      pharma-grade goods, our team knows the protocols inside out.`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 uppercase mb-8 border-l-4 border-primary-600 pl-4"
      >
        Why to Choose Us
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
              <h3 className="text-white font-black text-xl md:text-2xl mb-4 flex items-center gap-3">
                <Icon className="text-3xl" />
                {section.title}
              </h3>
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
        <p className="font-black text-secondary-600 mb-6 uppercase text-lg">Why Industrial Leaders Trust Us</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-4 rounded-lg"
              >
                <Icon className={`text-xl mt-1 flex-shrink-0 ${
                  index % 4 === 0 ? 'text-primary-600' :
                  index % 4 === 1 ? 'text-secondary-600' :
                  index % 4 === 2 ? 'text-success-600' : 'text-warning-600'
                }`} />
                <div>
                  <p className={`font-bold text-sm mb-1 ${
                    index % 4 === 0 ? 'text-primary-700 dark:text-primary-300' :
                    index % 4 === 1 ? 'text-secondary-700 dark:text-secondary-300' :
                    index % 4 === 2 ? 'text-success-700 dark:text-success-300' : 'text-warning-700 dark:text-warning-300'
                  }`}>{feature.title}</p>
                  <p className="text-slate-700 dark:text-slate-300 text-xs">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyUs;

