import { ArrowRight, Shield, Zap, Brain } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-surface" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 animate-fade-in">
            <Brain className="w-4 h-4" />
            <span>Deep Learning Powered Diagnosis</span>
          </div>
          
          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Early Detection of{" "}
            <span className="text-gradient">Deviated Nasal Septum</span>{" "}
            Using AI
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Upload CT scans or X-ray images for instant AI-powered analysis. Our deep learning model identifies septal deviations with high accuracy, enabling earlier intervention.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl">
              Upload Scan
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="medical" size="xl">
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">95%+</div>
              <div className="text-muted-foreground text-sm">Detection Accuracy</div>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">&lt;30s</div>
              <div className="text-muted-foreground text-sm">Analysis Time</div>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-success" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-1">CNN</div>
              <div className="text-muted-foreground text-sm">Deep Learning Model</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
