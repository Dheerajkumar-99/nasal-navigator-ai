import { Upload, Cpu, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description: "Upload a CT scan or X-ray image of the nasal cavity in standard formats like DICOM, PNG, or JPEG.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description: "Our CNN model processes the image, extracting features and analyzing the nasal septum structure.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Get Results",
    description: "Receive a detailed report with detection results, confidence scores, and clinical recommendations.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to get AI-powered analysis of nasal septum deviation
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-success" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl p-8 border border-border shadow-card relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 left-8 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    Step {step.step}
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-soft">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
