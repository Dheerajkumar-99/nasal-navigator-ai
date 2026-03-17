import { FileText, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "./AnalysisSection";

interface FinalDiagnosisProps {
  result: AnalysisResult | null;
}

const FinalDiagnosis = ({ result }: FinalDiagnosisProps) => {
  if (!result) return null;

  const getDiagnosis = () => {
    if (!result.detected) {
      return {
        title: "Normal — No Deviated Nasal Septum",
        summary: "The nasal septum appears midline with no significant deviation. No obstruction of the nasal airway is observed.",
        action: "No intervention required. Routine follow-up recommended.",
        variant: "normal" as const,
      };
    }
    if (result.severity === "Mild") {
      return {
        title: "Mild Deviated Nasal Septum (DNS)",
        summary: `A mild ${result.deviationType.toLowerCase()} deviation of ${result.deviationAngle}° is observed on the ${result.affectedSide?.toLowerCase()} side. This is unlikely to cause significant airway obstruction.`,
        action: "Conservative management. Monitor symptoms. Medical treatment if symptomatic.",
        variant: "mild" as const,
      };
    }
    if (result.severity === "Moderate") {
      return {
        title: "Moderate Deviated Nasal Septum (DNS)",
        summary: `A moderate ${result.deviationType.toLowerCase()} deviation of ${result.deviationAngle}° is detected affecting the ${result.affectedSide?.toLowerCase()} side. Partial airway obstruction may be present.`,
        action: "Medical management recommended. Consider septoplasty if symptomatic. ENT referral advised.",
        variant: "moderate" as const,
      };
    }
    return {
      title: "Severe Deviated Nasal Septum (DNS)",
      summary: `A severe ${result.deviationType.toLowerCase()} deviation of ${result.deviationAngle}° is identified on the ${result.affectedSide?.toLowerCase()} side with significant nasal airway compromise.`,
      action: "Surgical intervention (septoplasty) strongly recommended. Urgent ENT consultation required.",
      variant: "severe" as const,
    };
  };

  const diagnosis = getDiagnosis();

  const variantStyles = {
    normal: "border-success/30 bg-success/5",
    mild: "border-primary/30 bg-primary/5",
    moderate: "border-warning/30 bg-warning/5",
    severe: "border-destructive/30 bg-destructive/5",
  };

  const iconStyles = {
    normal: "bg-success text-success-foreground",
    mild: "bg-primary text-primary-foreground",
    moderate: "bg-warning text-warning-foreground",
    severe: "bg-destructive text-destructive-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`rounded-2xl border p-5 space-y-4 ${variantStyles[diagnosis.variant]}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconStyles[diagnosis.variant]}`}>
          {result.detected ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Final Diagnosis
          </h4>
          <p className="text-base font-bold text-foreground mt-1">{diagnosis.title}</p>
        </div>
      </div>

      <div className="space-y-3 pl-[52px]">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Findings</span>
          <p className="text-sm text-foreground/80 mt-0.5 leading-relaxed">{diagnosis.summary}</p>
        </div>

        {result.findings && (
          <div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">AI Observations</span>
            <p className="text-sm text-foreground/80 mt-0.5 leading-relaxed">{result.findings}</p>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 rounded-xl bg-card/60 border border-border/50">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Recommended Action</span>
            <p className="text-sm text-foreground font-medium mt-0.5">{diagnosis.action}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="pl-[52px] space-y-2">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Clinical Recommendations</span>
          <ol className="space-y-1.5">
            {result.recommendations.map((rec, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="w-5 h-5 rounded-md bg-secondary text-secondary-foreground text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {rec}
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </motion.div>
  );
};

export default FinalDiagnosis;
