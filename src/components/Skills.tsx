
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, ArrowRight } from "lucide-react";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

const Skills = () => {
  const { toast } = useToast();

  const { data: skills = [], error } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      console.log('Fetching skills...');
      const { data, error } = await supabase
        .from('Skill')
        .select('*')
        .order('category', { ascending: true });
      
      console.log('Skills data:', data);
      console.log('Skills error:', error);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching skills",
          description: error.message,
        });
        throw error;
      }
      return data || [];
    }
  });

  const technicalSkills = skills.filter((skill: any) => skill.category === 'technical');
  const softSkills = skills.filter((skill: any) => skill.category === 'soft');

  console.log('Technical skills:', technicalSkills);
  console.log('Soft skills:', softSkills);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      className="perspective-1000 mx-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="flex-shrink-0 w-[250px] card-3d-effect hover:scale-[1.08] hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 group">
        <CardContent className="p-4">
          <div className="mb-2 flex justify-between items-center">
            <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</span>
            <span className="text-muted-foreground">{skill.proficiency}%</span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  Skill Level
                </span>
              </div>
            </div>
            <div className="relative w-full">
              <div className="h-2 bg-primary/5 rounded-full">
                <motion.div 
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
              <div 
                className="absolute -right-1 top-0 h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 group-hover:animate-pulse-subtle transition-opacity duration-300"
                style={{ right: `calc(${100 - skill.proficiency}% - 4px)` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (error) {
    return (
      <section id="skills" className="section-padding bg-background">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center p-8">
            <AlertCircle className="h-6 w-6 text-destructive mr-2" />
            <p className="text-destructive">Failed to load skills. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title">
            Skills & Expertise
          </h2>
          <div className="space-y-16">
            <div className="space-y-4">
              <motion.h3 
                className="text-xl font-semibold text-center flex items-center justify-center gap-2 before:content-[''] before:h-0.5 before:w-12 before:bg-primary/50 after:content-[''] after:h-0.5 after:w-12 after:bg-primary/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Technical Skills
              </motion.h3>
              {technicalSkills.length > 0 ? (
                <HorizontalScroll showArrows={true}>
                  <motion.div 
                    className="flex gap-4 py-4 px-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {technicalSkills.map((skill: any, index: number) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                    <motion.div className="flex-shrink-0 w-[80px] flex items-center justify-center">
                      <ArrowRight className="text-muted-foreground w-6 h-6" />
                    </motion.div>
                  </motion.div>
                </HorizontalScroll>
              ) : (
                <p className="text-center text-muted-foreground bg-muted/30 py-4 rounded-lg">No technical skills available</p>
              )}
            </div>
            
            <div className="space-y-4">
              <motion.h3 
                className="text-xl font-semibold text-center flex items-center justify-center gap-2 before:content-[''] before:h-0.5 before:w-12 before:bg-primary/50 after:content-[''] after:h-0.5 after:w-12 after:bg-primary/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Soft Skills
              </motion.h3>
              {softSkills.length > 0 ? (
                <HorizontalScroll showArrows={true}>
                  <motion.div 
                    className="flex gap-4 py-4 px-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {softSkills.map((skill: any, index: number) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                    <motion.div className="flex-shrink-0 w-[80px] flex items-center justify-center">
                      <ArrowRight className="text-muted-foreground w-6 h-6" />
                    </motion.div>
                  </motion.div>
                </HorizontalScroll>
              ) : (
                <p className="text-center text-muted-foreground bg-muted/30 py-4 rounded-lg">No soft skills available</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
