import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from "@/components/theme-provider";
import FertilizerLogPage from '@/pages/FertilizerLogPage';
import EditPlantPage from '@/pages/EditPlantPage';

// Import Layout Components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

// Import Page Components
import Dashboard from '@/pages/Dashboard'; // Using the real Dashboard
import PlantInfoPage from '@/pages/PlantInfoPage';
import SettingsPage from '@/pages/SettingsPage';
import GuidelinesPage from '@/pages/GuidelinesPage';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import AddPlantPage from '@/pages/AddPlantPage';
import IrrigationPage from '@/pages/IrrigationPage';
import NotificationsPage from '@/pages/NotificationsPage';

// Import Auth Logic
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Animation settings
const pageVariants = {
  initial: { opacity: 0, x: "-2vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "2vw" }
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.35 };

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const pageTitles = {
    '/': 'Dashboard',
    '/add-plant': 'Add New Plant',
    '/fertilizer-log': 'Fertilizer Log',
    '/irrigation': 'Irrigation Control',
    '/notifications': 'Notification Settings',
    '/settings': 'Application Settings',
    '/guidelines': 'Crop Guidelines',
  };
  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/plant/')) return 'Plant Details';
    return pageTitles[pathname] || 'Dashboard';
  };
  
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden">
        <Header pageTitle={getPageTitle(location.pathname)} />
        <main className="flex-grow p-0 overflow-auto bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} /> 
                <Route path="/add-plant" element={<AddPlantPage />} />
                <Route path="/edit-plant/:id" element={<EditPlantPage />} />
                <Route path="/plant/:plantId" element={<PlantInfoPage />} />
                <Route path="/fertilizer-log" element={<FertilizerLogPage />} />
                <Route path="/irrigation" element={<IrrigationPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      storageKey="vite-ui-theme"
    >
      <Router>
        <AuthProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;