import { Activity, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground to-foreground/95" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="py-16 grid md:grid-cols-3 gap-12 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl">
              SeptumAI
            </span>
          </motion.div>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-background/70 text-center"
          >
            Deep Learning Model for Early Detection of Deviated Nasal Septum
          </motion.p>
          
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 justify-center md:justify-end"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-xl bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <div className="py-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © 2024 SeptumAI. Research Project.
            </p>
            
            <p className="text-background/40 text-xs text-center md:text-right max-w-lg">
              Disclaimer: This tool is intended for research and educational purposes only. 
              Always consult a qualified healthcare professional for medical diagnosis.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
