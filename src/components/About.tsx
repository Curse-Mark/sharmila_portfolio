
import { motion } from "framer-motion";
import useAboutData from "./about/useAboutData";
import { ProfileSection } from "./about/ProfileSection";
import { EducationSection } from "./about/EducationSection";
import { useEffect } from "react";

const About = () => {
  const { data: aboutData, error: aboutError, isLoading, refetch } = useAboutData();

  // Always refetch on component mount to ensure fresh data
  useEffect(() => {
    // Immediately refetch data when component mounts
    refetch();
    console.log("About component mounted, refetching data");
  }, [refetch]);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="section-title">
            About Me
          </h2>
          
          {/* Profile Section */}
          <ProfileSection 
            aboutData={aboutData} 
            aboutError={aboutError} 
            isLoading={isLoading} 
          />
          
          {/* Education Section */}
          <EducationSection />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
