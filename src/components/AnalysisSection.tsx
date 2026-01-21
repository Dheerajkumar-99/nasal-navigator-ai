import { useState } from "react";
import ImageUploader from "./ImageUploader";
import AnalysisResults from "./AnalysisResults";
import { Button } from "./ui/button";
import { Scan } from "lucide-react";

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
    <section id="analysis" className="py-20 gradient-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Analyze Your Scan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a CT scan or X-ray image and let our AI model detect potential nasal septum deviations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <ImageUploader onImageSelect={handleImageSelect} />
            
            {selectedFile && !isAnalyzing && (
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleAnalyze}
              >
                <Scan className="w-5 h-5" />
                Start Analysis
              </Button>
            )}
          </div>

          <div>
            <AnalysisResults isAnalyzing={isAnalyzing} hasResult={hasResult} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
