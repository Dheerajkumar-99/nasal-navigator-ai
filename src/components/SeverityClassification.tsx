import { AlertTriangle, CheckCircle, AlertOctagon, Minus } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "./AnalysisSection";

interface SeverityClassificationProps {
  result: AnalysisResult | null;
}

const severityLevels = [
  { key: "None", label: "None", color: "bg-muted text-muted-foreground", icon: CheckCircle, desc: "No deviation detected" },
  { key: "Mild", label: "Mild", color: "bg-success/15 text-success", icon: Minus, desc: "Minor asymmetry, typically asymptomatic" },
  { key: "Moderate", label: "Moderate", color: "bg-warning/15 text-warning", icon: AlertTriangle, desc: "Noticeable deviation, may cause symptoms" },
  { key: "Severe", label: "Severe", color: "bg-destructive/15 text-destructive", icon: AlertOctagon, desc: "Significant obstruction requiring attention" },
];

const SeverityClassification = ({ result }: SeverityClassificationProps) => {
  const activeSeverity = result?.severity || null;

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">DNS Severity Classification</h4>
      <div className="grid grid-cols-2 gap-2">
        {severityLevels.map((level, i) => {
          const isActive = activeSeverity === level.key;
          const Icon = level.icon;
          return (
            <motion.div
              key={level.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl border p-3 transition-all ${
                isActive
                  ? `${level.color} border-current shadow-soft`
                  : "border-border bg-muted/30 text-muted-foreground opacity-50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="severity-indicator"
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full gradient-hero shadow-glow"
                />
              )}
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold">{level.label}</span>
              </div>
              <p className="text-[11px] leading-tight opacity-80">{level.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SeverityClassification;
