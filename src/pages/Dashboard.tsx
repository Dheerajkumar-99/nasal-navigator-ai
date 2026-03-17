import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, LogOut, Shield, User, Upload, FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResults from "@/components/AnalysisResults";
import type { AnalysisResult } from "@/components/AnalysisSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const isAdmin = role === "admin";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedFile(file);
    if (!file) setResult(null);
  };

  const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve({ base64, mimeType: file.type });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    try {
      const { base64: imageBase64, mimeType } = await fileToBase64(selectedFile);
      const { data, error } = await supabase.functions.invoke("analyze-septum", {
        body: { imageBase64, mimeType },
      });
      if (error) throw error;
      setResult(data as AnalysisResult);
    } catch (error: any) {
      toast({ title: "Analysis Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Compact header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Septum<span className="text-gradient">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              {isAdmin ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
              {isAdmin ? "Admin" : "User"}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline truncate max-w-[150px]">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleSignOut}>
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isAdmin ? "Admin Dashboard" : "Dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Upload, label: "Scans", value: "—" },
            { icon: FileText, label: "Reports", value: "—" },
            { icon: BarChart3, label: "Accuracy", value: "99.2%" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground leading-none">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis section */}
        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Upload Scan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ImageUploader onImageSelect={handleImageSelect} />
              {selectedFile && !isAnalyzing && !result && (
                <Button onClick={handleAnalyze} className="w-full">
                  <Activity className="w-4 h-4 mr-1.5" />
                  Start Analysis
                </Button>
              )}
            </CardContent>
          </Card>

          <div>
            <AnalysisResults isAnalyzing={isAnalyzing} result={result} />
          </div>
        </div>

        {/* Admin panel */}
        {isAdmin && (
          <Card className="mt-4 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Admin Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage users, view all analyses, and configure system settings.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
