
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EducationItemProps {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
}

// Function to format date in Month Year format
const formatDate = (dateString: string | null) => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const EducationItem = ({ institution, degree, field_of_study, start_date, end_date, description }: EducationItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="perspective-1000"
    >
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700 transform transition-all duration-500 hover:scale-[1.02] hover:rotate-y-3 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 dark:hover:shadow-gray-300/10 dark:hover:bg-gray-800/90 dark:hover:border-green-900">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold dark:text-white">
              {institution}
            </CardTitle>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(start_date)} - {formatDate(end_date)}
            </span>
          </div>
          <div className="text-primary font-medium dark:text-green-400">
            {degree} in {field_of_study}
          </div>
        </CardHeader>
        <CardContent>
          {description && (
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
