import { Activity } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">
              SeptumAI
            </span>
          </div>
          
          <p className="text-background/60 text-sm text-center">
            Deep Learning Model for Early Detection of Deviated Nasal Septum
          </p>
          
          <p className="text-background/40 text-sm">
            © 2024 SeptumAI. Research Project.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-xs">
            Disclaimer: This tool is intended for research and educational purposes only. 
            Always consult a qualified healthcare professional for medical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
