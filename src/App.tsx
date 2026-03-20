import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { PropertyStoreProvider } from "@/contexts/PropertyStoreContext";
import Home from "./pages/Home";
import Imoveis from "./pages/Imoveis";
import ImovelDetail from "./pages/ImovelDetail";
import Anuncie from "./pages/Anuncie";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminImoveis from "./pages/admin/AdminImoveis";
import PropertyForm from "./pages/admin/PropertyForm";
import AdminLeads from "./pages/admin/AdminLeads";

const queryClient = new QueryClient();

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/imovel/:id" element={<ImovelDetail />} />
          <Route path="/anuncie" element={<Anuncie />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <AdminAuthProvider>
        <PropertyStoreProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="imoveis" element={<AdminImoveis />} />
                <Route path="imoveis/novo" element={<PropertyForm />} />
                <Route path="imoveis/editar/:id" element={<PropertyForm />} />
                <Route path="leads" element={<AdminLeads />} />
              </Route>
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </BrowserRouter>
        </PropertyStoreProvider>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
