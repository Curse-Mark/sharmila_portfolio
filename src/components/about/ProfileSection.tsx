
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AboutRow } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface ProfileSectionProps {
  aboutData: AboutRow | null;
  aboutError: Error | null;
  isLoading: boolean;
}

export const ProfileSection = ({ aboutData, aboutError, isLoading }: ProfileSectionProps) => {
  const { toast } = useToast();
  
  // Log data for debugging
  useEffect(() => {
    if (aboutData) {
      console.log("ProfileSection received aboutData:", aboutData);
    }
    
    if (aboutError) {
      console.error("ProfileSection error:", aboutError);
    }
  }, [aboutData, aboutError]);

  const handleDownloadResume = () => {
    if (!aboutData?.resume_url) {
      toast({
        title: "Resume Not Available",
        description: "The resume is not currently available for download.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const link = document.createElement('a');
      link.href = aboutData.resume_url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Resume Download",
        description: "Your download has started.",
      });
    } catch (error) {
      console.error("Resume download error:", error);
      toast({
        title: "Download Error",
        description: "Unable to download the resume. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
      <div className="relative group perspective-1000">
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition duration-500" />
        {isLoading ? (
          <div className="rounded-full w-64 h-64 mx-auto bg-gray-200 animate-pulse" />
        ) : aboutData?.photo_url ? (
          <motion.img
            src={aboutData.photo_url}
            alt="Profile"
            className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg transform transition-all duration-500 group-hover:scale-[1.05] group-hover:rotate-y-6 group-hover:shadow-xl group-hover:shadow-primary/10"
            whileHover={{ 
              rotateY: 12,
              scale: 1.05,
              transition: { duration: 0.5 }
            }}
            onError={(e) => {
              console.error("Profile image failed to load:", aboutData.photo_url);
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop";
            }}
          />
        ) : (
          <div className="rounded-full w-64 h-64 mx-auto bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      <Card className="shadow-md perspective-1000 transition-all duration-500 hover:scale-[1.02] hover:rotate-y-3 hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-gray-300/10 dark:hover:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : aboutData?.description ? (
            <p className="text-card-foreground">{aboutData.description}</p>
          ) : (
            <p className="text-gray-400">No description available</p>
          )}
          <Button 
            variant="outline" 
            className="w-full mt-4 flex items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-[1.02] dark:hover:bg-green-950 dark:hover:text-green-200"
            onClick={handleDownloadResume}
            disabled={!aboutData?.resume_url}
          >
            <Download size={16} />
            Download Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
