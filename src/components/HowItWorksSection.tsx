import { Upload, Cpu, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description: "Upload a CT scan or X-ray image of the nasal cavity in standard formats like DICOM, PNG, or JPEG.",
    details: ["Drag & drop support", "Multiple formats", "Secure upload"],
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our CNN model processes the image, extracting features and analyzing the nasal septum structure.",
    details: ["Feature extraction", "Pattern recognition", "Real-time processing"],
  },
  {
    icon: FileText,
    step: "03",
    title: "Get Results",
    description: "Receive a detailed report with detection results, confidence scores, and clinical recommendations.",
    details: ["Confidence scores", "Severity rating", "Recommendations"],
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-28 gradient-surface relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Three simple steps to get AI-powered analysis of nasal septum deviation
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-1 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-primary via-accent to-success opacity-30" />
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-success"
              />
            </div>
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-card rounded-3xl p-8 border border-border shadow-card relative z-10 h-full hover:shadow-card-hover hover:border-primary/20 transition-all duration-300">
                  {/* Step badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute -top-5 left-8 px-4 py-2 gradient-hero text-primary-foreground rounded-xl text-sm font-bold shadow-glow"
                  >
                    Step {step.step}
                  </motion.div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-3xl gradient-hero flex items-center justify-center mb-8 mt-4 shadow-lg">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  {/* Details list */}
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-success" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center shadow-soft">
                      <ArrowRight className="w-5 h-5 text-primary-foreground rotate-90" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
