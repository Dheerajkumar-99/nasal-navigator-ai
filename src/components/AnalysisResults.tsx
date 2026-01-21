import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Activity, TrendingUp, Clock, Target } from "lucide-react";
import { Progress } from "./ui/progress";

interface AnalysisResultsProps {
  isAnalyzing: boolean;
  hasResult: boolean;
}

const AnalysisResults = ({ isAnalyzing, hasResult }: AnalysisResultsProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Preprocessing image...",
    "Extracting features...",
    "Running CNN analysis...",
    "Generating report...",
  ];

  useEffect(() => {
    if (isAnalyzing) {
      setProgress(0);
      setCurrentStep(0);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 1250);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [isAnalyzing]);

  if (!isAnalyzing && !hasResult) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center shadow-card">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          No Analysis Yet
        </h3>
        <p className="text-muted-foreground">
          Upload a CT scan or X-ray image to begin the AI-powered analysis
        </p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center animate-pulse-soft">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Analyzing Image
            </h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep]}</p>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />

        <div className="grid grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-xs text-center py-2 px-1 rounded-lg transition-colors ${
                index <= currentStep
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.replace("...", "")}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mock results
  const mockResult = {
    detected: true,
    confidence: 94.7,
    severity: "Moderate",
    deviationAngle: 12.5,
    recommendations: [
      "Consultation with an ENT specialist recommended",
      "Further imaging may be required for surgical planning",
      "Monitor for symptoms of nasal obstruction",
    ],
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className={`p-6 ${mockResult.detected ? "bg-warning/10" : "bg-success/10"}`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
            mockResult.detected ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"
          }`}>
            {mockResult.detected ? (
              <AlertTriangle className="w-7 h-7" />
            ) : (
              <CheckCircle className="w-7 h-7" />
            )}
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {mockResult.detected ? "Deviation Detected" : "No Deviation Detected"}
            </h3>
            <p className="text-muted-foreground">
              Analysis completed successfully
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="p-6 grid grid-cols-3 gap-4 border-b border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-primary mb-1">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Confidence</span>
          </div>
          <div className="font-display text-2xl font-bold text-foreground">
            {mockResult.confidence}%
          </div>
        </div>

        <div className="text-center border-x border-border">
          <div className="flex items-center justify-center gap-1 text-warning mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Severity</span>
          </div>
          <div className="font-display text-2xl font-bold text-foreground">
            {mockResult.severity}
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-accent mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Angle</span>
          </div>
          <div className="font-display text-2xl font-bold text-foreground">
            {mockResult.deviationAngle}°
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6">
        <h4 className="font-display font-semibold text-foreground mb-4">
          Recommendations
        </h4>
        <ul className="space-y-3">
          {mockResult.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">{index + 1}</span>
              </div>
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResults;
