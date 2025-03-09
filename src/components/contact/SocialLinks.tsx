
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

type SocialPlatform = "email" | "whatsapp" | "phone" | "linkedin";

interface SocialLinkProps {
  platform: SocialPlatform;
  icon: React.ElementType;
  ariaLabel: string;
  bgColor: string;
}

const SocialLinks = () => {
  const { toast } = useToast();

  const handleSocialClick = (platform: SocialPlatform) => {
    const urls: Record<SocialPlatform, string> = {
      email: "mailto:sharmila21003@gmail.com",
      whatsapp: "https://wa.me/8695955461", 
      phone: "tel:+91 8695955461",
      linkedin: "https://www.linkedin.com/in/sharmila-s-b141b7289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    };

    window.open(urls[platform], "_blank");
    toast({
      title: `Opening ${platform}`,
      description: `Redirecting to ${platform}...`,
    });
  };

  const socialLinks: SocialLinkProps[] = [
    { 
      icon: Mail, 
      platform: "email",
      ariaLabel: "Email",
      bgColor: "bg-blue-500 dark:bg-blue-600"
    },
    { 
      icon: FaWhatsapp, 
      platform: "whatsapp",
      ariaLabel: "WhatsApp",
      bgColor: "bg-green-500 dark:bg-green-600"
    },
    { 
      icon: Phone, 
      platform: "phone",
      ariaLabel: "Phone",
      bgColor: "bg-purple-500 dark:bg-purple-600"
    },
    { 
      icon: Linkedin, 
      platform: "linkedin",
      ariaLabel: "LinkedIn",
      bgColor: "bg-blue-600 dark:bg-blue-700"
    },
  ];

  return (
    <div className="flex justify-center space-x-8">
      {socialLinks.map(({ icon: Icon, platform, ariaLabel, bgColor }, index) => (
        <motion.div 
          key={index}
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="cursor-pointer perspective-1000"
          onClick={() => handleSocialClick(platform)}
          aria-label={ariaLabel}
        >
          <div className={`p-5 rounded-full transition-all duration-500 
            shadow-md dark:shadow-lg ${bgColor}
            text-white hover:shadow-xl`}>
            <Icon className="w-6 h-6" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialLinks;
