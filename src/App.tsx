import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AppLayout } from "./components/layout/AppLayout";
import Index from "./pages/Index";
import CashManagement from "./pages/CashManagement";
import MemberSavings from "./pages/MemberSavings";
import SharesTracking from "./pages/SharesTracking";
import LoanManagement from "./pages/LoanManagement";
import GeneralLedger from "./pages/GeneralLedger";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cash-management" element={<CashManagement />} />
              <Route path="/member-savings" element={<MemberSavings />} />
              <Route path="/shares-tracking" element={<SharesTracking />} />
              <Route path="/loan-management" element={<LoanManagement />} />
              <Route path="/general-ledger" element={<GeneralLedger />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
