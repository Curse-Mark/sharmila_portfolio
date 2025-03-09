
import { useRef, useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  showArrows?: boolean;
}

export function HorizontalScroll({ 
  children, 
  className,
  showArrows = true 
}: HorizontalScrollProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowVisibility = () => {
    if (!scrollAreaRef.current || !showArrows) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollAreaRef.current;
    const isAtStart = scrollLeft <= 10; // small threshold for better UX
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10; // small threshold for better UX
    
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  // Check if scrolling is needed when content changes or on resize
  useEffect(() => {
    if (!scrollAreaRef.current || !contentRef.current || !showArrows) return;
    
    const checkScrollable = () => {
      const { clientWidth } = scrollAreaRef.current!;
      const { scrollWidth } = contentRef.current!;
      
      // Show right arrow only if content is wider than container
      setShowRightArrow(scrollWidth > clientWidth);
    };
    
    // Initial check
    checkScrollable();
    
    // Add resize listener for responsive updates
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children, showArrows]);

  // Listen for scroll events to update arrow visibility
  useEffect(() => {
    const scrollElement = scrollAreaRef.current;
    if (!scrollElement || !showArrows) return;
    
    scrollElement.addEventListener('scroll', updateArrowVisibility);
    return () => scrollElement.removeEventListener('scroll', updateArrowVisibility);
  }, [showArrows]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollAreaRef.current) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    const currentScroll = scrollAreaRef.current.scrollLeft;
    
    scrollAreaRef.current.scrollTo({
      left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  };

  // For mobile, return a regular grid instead of horizontal scroll
  if (isMobile) {
    return (
      <div className={`grid grid-cols-1 gap-4 ${className}`}>
        {Array.isArray(children) ? children : [children]}
      </div>
    );
  }

  return (
    <div className="relative group">
      {showArrows && showLeftArrow && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 shadow-md -ml-2 border border-border/50 dark:border-primary/30 dark:hover:border-primary/50 dark:hover:bg-primary/10 dark:hover:text-primary"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <ScrollArea 
        className={`w-full ${className}`}
        ref={scrollAreaRef}
        onScroll={updateArrowVisibility}
      >
        <div className="flex space-x-4 pb-4 px-4" ref={contentRef}>
          {children}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
      {showArrows && showRightArrow && (
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 shadow-md -mr-2 border border-border/50 dark:border-primary/30 dark:hover:border-primary/50 dark:hover:bg-primary/10 dark:hover:text-primary"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
