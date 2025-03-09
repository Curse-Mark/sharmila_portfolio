
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HorizontalScroll } from "@/components/ui/horizontal-scroll";

const Achievements = () => {
  const { data: achievements = [] } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data } = await supabase.from('Achievement').select('*')
        .order('date', { ascending: false });
      return data || [];
    }
  });

  return (
    <section id="achievements" className="section-padding bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title">
            Achievements
          </h2>
          
          {achievements.length > 0 ? (
            <HorizontalScroll showArrows={true}>
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[350px] perspective-1000"
                >
                  <Card className="h-full transition-all duration-500 hover:border-primary/50 hover:shadow-xl border border-border/50 transform hover:scale-[1.05] hover:rotate-y-6 hover:shadow-primary/10 dark:hover:border-primary/30 dark:hover:shadow-primary/5 dark:bg-gray-800/80 dark:border-gray-700/50">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">{achievement.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </HorizontalScroll>
          ) : (
            <p className="text-center text-muted-foreground">No achievements available yet</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
