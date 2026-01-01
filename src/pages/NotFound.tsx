import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-4 h-4 gauge-indicator mx-auto mb-6 animate-pulse-glow" />
        <h1 className="mb-4 text-6xl font-display text-foreground">404</h1>
        <p className="mb-6 text-xl text-muted-foreground font-body">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-display text-sm hover:bg-primary hover:text-primary-foreground transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
