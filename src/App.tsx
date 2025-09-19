import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser, type User } from "./lib/mockData";

const queryClient = new QueryClient();

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const handleGetStarted = () => {
    setCurrentView('auth');
  };

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen">
          {currentView === 'home' && <Home onGetStarted={handleGetStarted} />}
          {currentView === 'auth' && <Auth onBack={handleBack} onAuthSuccess={handleAuthSuccess} />}
          {currentView === 'dashboard' && user && <Dashboard onLogout={handleLogout} />}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
