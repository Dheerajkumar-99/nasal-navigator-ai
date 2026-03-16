import { useState, useEffect } from "react";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#analysis", label: "Analysis" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -inset-1 gradient-hero rounded-2xl blur-lg opacity-30" />
          </div>
          <span className="font-display font-bold text-2xl text-foreground">
            Septum<span className="text-gradient">AI</span>
          </span>
        </motion.div>
        
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-muted-foreground hover:text-foreground transition-colors font-medium"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-hero transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="hero" size="default" className="hidden md:flex" onClick={() => navigate('/auth')}>
            Sign In
          </Button>
          
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button variant="hero" size="lg" className="mt-2" onClick={() => window.location.href = '/auth'}>
                Sign In
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
