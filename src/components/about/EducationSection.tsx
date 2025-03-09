
import { motion } from "framer-motion";
import { useState } from "react";
import { EducationItem } from "./EducationItem";

interface EducationItemType {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
}

export const EducationSection = () => {
  // Manual education data
  const [education] = useState<EducationItemType[]>([
    {
      id: 1,
      institution: "St. Anthony's arts and science college for women's",
      degree: "Master of Commerce",
      field_of_study: "Commerce",
      start_date: "2020-06-17",
      end_date: "2023-05-19",
      description: "Specialized in Commerece and Accountant."
    }
    // {
    //   id: 2,
    //   institution: "Cheran Vidhyalaya",
    //   degree: "Bachelor of Science",
    //   field_of_study: "Software Engineering",
    //   start_date: "2014-09-01",
    //   end_date: "2018-05-31",
    //   description: "Focused on full-stack development and software architecture. Participated in multiple hackathons and coding competitions"
    // },
    // {
    //   id: 3,
    //   institution: "MIT",
    //   degree: "Certificate",
    //   field_of_study: "Data Science",
    //   start_date: "2021-01-15",
    //   end_date: null,
    //   description: "Currently pursuing advanced certification in data science and analytics with focus on big data technologies."
    // }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-center mb-8 dark:text-white">Education</h3>
      <div className="space-y-6">
        {education.map((item) => (
          <EducationItem key={item.id} {...item} />
        ))}
      </div>
    </motion.div>
  );
};
