import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import CashManagement from "./pages/CashManagement";
import MemberSavings from "./pages/MemberSavings";
import SharesTracking from "./pages/SharesTracking";
import LoanManagement from "./pages/LoanManagement";
import GeneralLedger from "./pages/GeneralLedger";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// Province accounting pages
import Cashbook from "./pages/Cashbook";
import Bankbook from "./pages/Bankbook";
import CardTransactions from "./pages/CardTransactions";
import DailyLedger from "./pages/DailyLedger";
import ClassifiedAccounts from "./pages/ClassifiedAccounts";
import TrialBalance from "./pages/TrialBalance";
import IncomeStatement from "./pages/IncomeStatement";
import FinancialReport from "./pages/FinancialReport";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";
import Categories from "./pages/Categories";
import Organizations from "./pages/Organizations";
import AuditLogs from "./pages/AuditLogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/cash-management" element={<CashManagement />} />
                      <Route path="/member-savings" element={<MemberSavings />} />
                      <Route path="/shares-tracking" element={<SharesTracking />} />
                      <Route path="/loan-management" element={<LoanManagement />} />
                      <Route path="/general-ledger" element={<GeneralLedger />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/user-management" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <UserManagement />
                        </ProtectedRoute>
                      } />
                      {/* Province accounting routes */}
                      <Route path="/cashbook" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <Cashbook />
                        </ProtectedRoute>
                      } />
                      <Route path="/bankbook" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <Bankbook />
                        </ProtectedRoute>
                      } />
                      <Route path="/card-transactions" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <CardTransactions />
                        </ProtectedRoute>
                      } />
                      <Route path="/daily-ledger" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <DailyLedger />
                        </ProtectedRoute>
                      } />
                      <Route path="/classified-accounts" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <ClassifiedAccounts />
                        </ProtectedRoute>
                      } />
                      <Route path="/trial-balance" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <TrialBalance />
                        </ProtectedRoute>
                      } />
                      <Route path="/income-statement" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <IncomeStatement />
                        </ProtectedRoute>
                      } />
                      <Route path="/financial-report" element={
                        <ProtectedRoute allowedRoles={['userprovince']}>
                          <FinancialReport />
                        </ProtectedRoute>
                      } />
                      <Route path="/user-profile" element={<UserProfile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/categories" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Categories />
                        </ProtectedRoute>
                      } />
                      <Route path="/organizations" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <Organizations />
                        </ProtectedRoute>
                      } />
                      <Route path="/audit-logs" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AuditLogs />
                        </ProtectedRoute>
                      } />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
