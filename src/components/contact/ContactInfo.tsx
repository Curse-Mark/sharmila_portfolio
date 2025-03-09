
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import MapView from "./MapView";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold dark:text-white">Contact Information</h3>
      <p className="text-gray-600 dark:text-gray-300">
        Feel free to reach out for collaborations or just a friendly hello
      </p>
      
      {/* Social media icons with enhanced 3D hover effects */}
      <SocialLinks />
      
      {/* Google Map with enhanced 3D effects */}
      <MapView />
    </div>
  );
};

export default ContactInfo;
