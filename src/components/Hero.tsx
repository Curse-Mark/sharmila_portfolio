
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react"; 
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const titles = ["Commerce", "Accountant", "Financial Analyst"];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const updateText = () => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const timer = setTimeout(updateText, isDeleting ? 100 : 200);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative hero-gradient pt-20 overflow-hidden"
    >
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 animate-float blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-500/10 animate-float blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 rounded-full bg-purple-500/5 dark:bg-purple-500/10 animate-float blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Hi, I'm Sharmila
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-600 dark:text-white mb-8 h-12"
          >
            <span className="inline-block min-w-[20ch]">
              I'm a{" "}
              <span className="text-primary font-semibold dark:text-primary relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary/30 after:bottom-0 after:left-0">
                {displayText}
              </span>
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full px-8 shadow-lg group"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 shadow-sm hover:shadow-md"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-12 flex justify-center gap-6"
          >
            {[
              { icon: FaWhatsapp, href: "https://wa.me/8695955461", label: "WhatsApp", hoverColor: "hover:text-green-500 hover:shadow-green-500/20" },
              { icon: Phone, href: "tel:+91 8695955461", label: "Phone", hoverColor: "hover:text-purple-500 hover:shadow-purple-500/20" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/sharmila-s-b141b7289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn", hoverColor: "hover:text-blue-500 hover:shadow-blue-500/20" },
              { icon: Mail, href: "mailto:sharmila21003@gmail.com", label: "Email", hoverColor: "hover:text-yellow-500 hover:shadow-yellow-500/20" },
            ].map(({ icon: Icon, href, label, hoverColor }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-gray-600 dark:text-gray-300 ${hoverColor} transition-all p-3 rounded-full hover:scale-125 hover:shadow-lg`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
