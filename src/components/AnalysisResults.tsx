import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Activity, TrendingUp, Clock, Target, Sparkles, MapPin, RotateCcw } from "lucide-react";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import type { AnalysisResult } from "./AnalysisSection";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
}

const AnalysisResults = ({ isAnalyzing, result }: AnalysisResultsProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Preprocessing image...",
    "Extracting features...",
    "Running AI analysis...",
    "Generating report...",
  ];

  useEffect(() => {
    if (isAnalyzing) {
      setProgress(0);
      setCurrentStep(0);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 1;
        });
      }, 200);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    } else if (result) {
      setProgress(100);
    }
  }, [isAnalyzing]);

  if (!isAnalyzing && !result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl border border-border p-10 text-center shadow-card h-full flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
          <Activity className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-3">
          No Analysis Yet
        </h3>
        <p className="text-muted-foreground max-w-xs">
          Upload a CT scan or X-ray image to begin the AI-powered analysis
        </p>
      </motion.div>
    );
  }

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl border border-border p-10 shadow-card h-full"
      >
        <div className="flex items-center gap-5 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-2 gradient-hero rounded-3xl"
            />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Analyzing Image
            </h3>
            <p className="text-muted-foreground">{steps[currentStep]}</p>
          </div>
        </div>

        <div className="relative mb-6">
          <Progress value={progress} className="h-3" />
          <motion.div
            className="absolute -top-1 h-5 w-5 rounded-full gradient-hero shadow-glow"
            style={{ left: `calc(${progress}% - 10px)` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`text-xs text-center py-3 px-2 rounded-xl transition-all duration-300 ${
                index <= currentStep
                  ? "gradient-hero text-primary-foreground shadow-soft"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.replace("...", "")}
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-3xl border border-border shadow-card overflow-hidden"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-8 ${result.detected ? "bg-gradient-to-r from-warning/10 to-warning/5" : "bg-gradient-to-r from-success/10 to-success/5"}`}
        >
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                result.detected ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"
              }`}
            >
              {result.detected ? (
                <AlertTriangle className="w-8 h-8" />
              ) : (
                <CheckCircle className="w-8 h-8" />
              )}
            </motion.div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
                {result.detected ? "Deviation Detected" : "No Deviation Detected"}
                <Sparkles className="w-5 h-5 text-primary" />
              </h3>
              <p className="text-muted-foreground">
                Analysis completed successfully
              </p>
            </div>
          </div>
        </motion.div>

        {/* Findings */}
        {result.findings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="px-8 pt-6"
          >
            <p className="text-foreground/80 leading-relaxed bg-muted/50 p-4 rounded-2xl text-sm">
              {result.findings}
            </p>
          </motion.div>
        )}

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border"
        >
          {[
            { icon: Target, label: "Confidence", value: `${result.confidence}%`, color: "text-primary" },
            { icon: TrendingUp, label: "Severity", value: result.severity, color: "text-warning" },
            { icon: Clock, label: "Angle", value: `${result.deviationAngle}°`, color: "text-accent-foreground" },
            { icon: RotateCcw, label: "Type", value: result.deviationType, color: "text-primary" },
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className={`flex items-center justify-center gap-2 ${metric.color} mb-2`}>
                <metric.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {metric.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Affected Side */}
        {result.affectedSide && result.affectedSide !== "None" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="px-8 pt-6 flex items-center gap-3"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Affected Side: {result.affectedSide}</span>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-8"
        >
          <h4 className="font-display font-bold text-foreground mb-6 text-lg">
            Recommendations
          </h4>
          <ul className="space-y-4">
            {result.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-soft">
                  <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                </div>
                <span className="text-foreground leading-relaxed">{rec}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnalysisResults;
