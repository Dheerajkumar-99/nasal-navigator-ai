import { useState } from "react";
import ImageUploader from "./ImageUploader";
import AnalysisResults from "./AnalysisResults";
import { Button } from "./ui/button";
import { Scan, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AnalysisSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setHasResult(false);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setHasResult(false);
    
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 5000);
  };

  return (
    <section id="analysis" className="py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI Analysis
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Analyze Your Scan
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Upload a CT scan or X-ray image and let our AI model detect potential nasal septum deviations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <ImageUploader onImageSelect={handleImageSelect} />
            
            {selectedFile && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full group"
                  onClick={handleAnalyze}
                >
                  <Scan className="w-6 h-6 group-hover:animate-pulse" />
                  Start Analysis
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnalysisResults isAnalyzing={isAnalyzing} hasResult={hasResult} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
