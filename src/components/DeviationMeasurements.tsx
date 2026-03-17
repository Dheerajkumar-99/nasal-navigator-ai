import { Ruler, RotateCcw, Compass, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "./ui/progress";
import type { AnalysisResult } from "./AnalysisSection";

interface DeviationMeasurementsProps {
  result: AnalysisResult | null;
}

const DeviationMeasurements = ({ result }: DeviationMeasurementsProps) => {
  if (!result) return null;

  const measurements = [
    {
      icon: Compass,
      label: "Deviation Angle",
      value: `${result.deviationAngle}°`,
      progress: Math.min((result.deviationAngle / 30) * 100, 100),
      desc: result.deviationAngle > 15 ? "Significant" : result.deviationAngle > 7 ? "Moderate" : "Minimal",
    },
    {
      icon: RotateCcw,
      label: "Deviation Type",
      value: result.deviationType,
      progress: null,
      desc: result.deviationType === "None" ? "Normal septum" : `${result.deviationType} curvature pattern`,
    },
    {
      icon: ArrowLeftRight,
      label: "Affected Side",
      value: result.affectedSide || "None",
      progress: null,
      desc: result.affectedSide === "Bilateral" ? "Both nasal passages affected" : result.affectedSide !== "None" ? `${result.affectedSide} nasal passage affected` : "No lateralization",
    },
    {
      icon: Ruler,
      label: "Confidence",
      value: `${result.confidence}%`,
      progress: result.confidence,
      desc: result.confidence >= 85 ? "High confidence" : result.confidence >= 60 ? "Moderate confidence" : "Low confidence",
    },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">Deviation Measurements</h4>
      <div className="space-y-3">
        {measurements.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50"
          >
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <m.icon className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs text-muted-foreground">{m.label}</span>
                <span className="text-sm font-bold text-foreground">{m.value}</span>
              </div>
              {m.progress !== null && (
                <Progress value={m.progress} className="h-1.5 mb-1" />
              )}
              <span className="text-[11px] text-muted-foreground">{m.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeviationMeasurements;
