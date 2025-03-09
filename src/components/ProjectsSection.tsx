
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

const ProjectsSection = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await supabase.from('project').select('*');
      return data || [];
    }
  });

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title">
            Projects
          </h2>
          
          {projects.length > 0 ? (
            <HorizontalScroll showArrows={true}>
              {projects.map((project: any) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[350px] perspective-1000"
                >
                  <Card className="h-full transition-all duration-500 hover:border-primary/50 hover:shadow-xl border border-border/50 overflow-hidden transform hover:scale-[1.05] hover:rotate-y-6 hover:shadow-primary/10 dark:hover:border-primary/30 dark:hover:shadow-primary/5">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="overflow-hidden rounded-lg perspective-1000">
                        <img 
                          src={project.image_url} 
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg transform transition-all duration-700 hover:scale-110"
                        />
                      </div>
                      <p className="text-foreground/80">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="hover:bg-primary/20 transform transition-all duration-300 hover:scale-110 hover:shadow-sm dark:hover:bg-primary/10 dark:hover:text-primary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalScroll>
          ) : (
            <p className="text-center text-muted-foreground">No projects available yet</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
