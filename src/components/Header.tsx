import { Activity } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Septum<span className="text-gradient">AI</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#analysis" className="text-muted-foreground hover:text-foreground transition-colors">
            Analysis
          </a>
        </nav>

        <Button variant="hero" size="sm">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
