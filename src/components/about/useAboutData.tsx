
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AboutRow } from "@/integrations/supabase/client";

const useAboutData = () => {
  const fetchAboutData = async () => {
    console.log("Fetching about data...");
    
    // Get the URL from environment variables instead of accessing protected property
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rtlnqcwwphlinrezydul.supabase.co";
    console.log("Connected to Supabase URL:", supabaseUrl);
    
    try {
      // Use lowercase "about" to match the table name in the database
      const { data, error, count } = await supabase
        .from("about")
        .select("*");

      if (error) {
        console.error("Error fetching about data:", error);
        throw error;
      }

      console.log("About data fetched:", data, "Count:", count);

      if (data && data.length > 0) {
        return data[0] as AboutRow;
      } else {
        console.warn("No about data found, returning default");
        return {
          id: 0,
          description: "I am a passionate professional with expertise in web development and design. My goal is to create engaging and user-friendly digital experiences.",
          photo_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
          resume_url: null,
          created_at: null,
          updated_at: null,
        } as AboutRow;
      }
    } catch (error) {
      console.error("Error in fetchAboutData:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
  });
};

export default useAboutData;
