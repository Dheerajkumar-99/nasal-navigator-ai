import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, LogOut, Shield, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Septum<span className="text-gradient">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              {isAdmin ? "Admin" : "User"}
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border/50 shadow-card hover:shadow-card-hover transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-display">Analyze Scan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a nasal CT scan for AI-powered septum analysis.
                </p>
                <Button variant="hero" size="sm" onClick={() => navigate("/")}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Go to Scanner
                </Button>
              </CardContent>
            </Card>

            {isAdmin && (
              <Card className="border-primary/20 shadow-card hover:shadow-card-hover transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
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
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
