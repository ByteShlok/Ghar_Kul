import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import CustomerApp from "@/components/CustomerApp";
import AdminDashboard from "@/components/AdminDashboard";
import { TodayMenuProvider } from "@/context/TodayMenuContext";

const Index = () => {
  const [view, setView] = useState<"customer" | "admin">("customer");

  return (
    <TodayMenuProvider>
      <div className="min-h-screen bg-background">
        {/* View Switcher */}
        <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 py-3 px-4">
            <span className="text-xs text-muted-foreground font-medium mr-2 uppercase tracking-widest">Wireframe</span>
            <button
              onClick={() => setView("customer")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "customer"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Customer App
            </button>
            <button
              onClick={() => setView("admin")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "admin"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Admin Dashboard
            </button>
          </div>
        </div>

        {/* Content */}
        {view === "customer" ? (
          <div className="py-6">
            <CustomerApp />
          </div>
        ) : (
          <AdminDashboard />
        )}
      </div>
    </TodayMenuProvider>
  );
};

export default Index;
