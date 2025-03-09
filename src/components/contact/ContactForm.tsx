
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Store the contact message in the database
      const { error: dbError } = await supabase
        .from('Contact')
        .insert([
          { name, email, message }
        ]);
        
      if (dbError) {
        console.error("Error storing contact in database:", dbError);
        // Continue with email sending even if database storage fails
      }
      
      // Send the email notification via the edge function
      const { error: emailError, data } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message },
      });
      
      if (emailError) {
        console.error("Error sending email:", emailError);
        throw new Error("Failed to send email. Please try again later.");
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset the form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error sending message",
        description: error.message || "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4 perspective-1000"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Input 
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-enhanced dark:bg-gray-800 dark:border-gray-700" 
      />
      <Input 
        placeholder="Your Email" 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-enhanced dark:bg-gray-800 dark:border-gray-700" 
      />
      <Textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[150px] resize-none input-enhanced dark:bg-gray-800 dark:border-gray-700"
      />
      <Button 
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-glow"
        variant="gradient"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
