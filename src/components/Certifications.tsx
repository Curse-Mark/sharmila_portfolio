
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

const Certifications = () => {
  const { data: certifications = [] } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data } = await supabase.from('certificate').select('*');
      return data || [];
    }
  });

  return (
    <section id="certifications" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title">
            Certifications
          </h2>
          
          {certifications.length > 0 ? (
            <HorizontalScroll showArrows={true}>
              {certifications.map((cert: any) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[350px] perspective-1000"
                >
                  <Card className="h-full transition-all duration-500 hover:border-primary/50 hover:shadow-xl border border-border/50 overflow-hidden dark:bg-gray-800 dark:border-gray-700/50 transform hover:scale-[1.05] hover:rotate-y-6 hover:shadow-primary/10 dark:hover:border-primary/30 dark:hover:shadow-primary/5">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold dark:text-white">{cert.title}</CardTitle>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">
                        {new Date(cert.date).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="overflow-hidden rounded-lg perspective-1000">
                        <img 
                          src={cert.image_url} 
                          alt={cert.title}
                          className="w-full h-48 object-cover rounded-lg transform transition-all duration-700 hover:scale-110"
                        />
                      </div>
                      <p className="text-foreground/80 dark:text-gray-300">{cert.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalScroll>
          ) : (
            <p className="text-center text-muted-foreground dark:text-gray-400">No certifications available yet</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
