import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense, lazy } from "react";
import "./i18n";

// Lazy load all page components for code-splitting
const Index = lazy(() => import("./pages/Index"));
const SurfSpots = lazy(() => import("./pages/SurfSpots"));
const LiveCams = lazy(() => import("./pages/LiveCams"));
const SurfSpotDetail = lazy(() => import("./pages/SurfSpotDetail"));
const News = lazy(() => import("./pages/News"));
const Sponsor = lazy(() => import("./pages/Sponsor"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/surf-spots" element={<SurfSpots />} />
              <Route path="/surf-spot/:id" element={<SurfSpotDetail />} />
              <Route path="/live-cams" element={<ProtectedRoute><LiveCams /></ProtectedRoute>} />
              <Route path="/news" element={<News />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
