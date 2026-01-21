import { ArrowRight, Shield, Zap, Brain, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-surface" />
      <div className="absolute inset-0 pattern-grid opacity-50" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground">Deep Learning Powered Diagnosis</span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-8"
            >
              Early Detection of{" "}
              <span className="text-gradient relative">
                Deviated Nasal Septum
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                      <stop stopColor="hsl(199, 89%, 48%)" />
                      <stop offset="1" stopColor="hsl(172, 66%, 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              Using AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Upload CT scans or X-ray images for instant AI-powered analysis. Our deep learning model identifies septal deviations with high accuracy, enabling earlier intervention.
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <Button variant="hero" size="xl" className="group">
                Upload Scan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="medical" size="xl">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, value: "95%+", label: "Detection Accuracy", color: "primary" },
              { icon: Shield, value: "<30s", label: "Analysis Time", color: "accent" },
              { icon: Brain, value: "CNN", label: "Deep Learning Model", color: "success" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="absolute inset-0 gradient-hero opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300" />
                <div className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}`} />
                </div>
                <div className="font-display text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
