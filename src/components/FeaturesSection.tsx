import { Brain, Cpu, Shield, Clock, BarChart3, Stethoscope } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Deep Learning CNN",
    description: "Convolutional Neural Network trained on thousands of CT scans for accurate septum deviation detection.",
  },
  {
    icon: Cpu,
    title: "Real-time Processing",
    description: "Advanced GPU-accelerated inference delivers results in under 30 seconds.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance.",
  },
  {
    icon: Clock,
    title: "Early Detection",
    description: "Identify deviations before symptoms worsen, enabling proactive treatment planning.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive analysis including deviation angle, severity classification, and recommendations.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Integration",
    description: "Seamlessly integrates with existing PACS and EHR systems for streamlined workflows.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our deep learning model leverages state-of-the-art computer vision techniques to provide accurate and reliable diagnoses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary group-hover:gradient-hero flex items-center justify-center mb-5 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-secondary-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
