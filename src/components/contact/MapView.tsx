
import { motion } from "framer-motion";

const MapView = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03, rotateY: 5 }}
      className="mt-8 rounded-lg overflow-hidden shadow-lg perspective-1000 border border-gray-200 dark:border-gray-700"
    >
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d490.73712121334336!2d77.92644025109429!3d10.269884889642514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d10.270126379733613!2d77.92652608177895!5e0!3m2!1sen!2sin!4v1740985663943!5m2!1sen!2sin" 
        width="100%" 
        height="250" 
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
        className="rounded-lg"
      ></iframe>
    </motion.div>
  );
};

export default MapView;
