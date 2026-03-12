import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Nosotros from "./pages/Nosotros";
import Curso from "./pages/Curso";
import Equipo from "./pages/Equipo";
import Noticias from "./pages/Noticias";
import NoticiaDetail from "./pages/NoticiaDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PlataformaPage from "./pages/PlataformaPage";
import DepartmentPage from "./pages/DepartmentPage";
import NotFound from "./pages/NotFound";
import Postulacion from "./pages/Postulacion";
import Contacto from "./pages/Contacto";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/curso" element={<Curso />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/postulacion" element={<Postulacion />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/plataforma" element={<PlataformaPage />} />
          <Route path="/investigacion" element={<DepartmentPage deptId="investigacion" />} />
          <Route path="/academico" element={<DepartmentPage deptId="academico" />} />
          <Route path="/innovacion" element={<DepartmentPage deptId="innovacion" />} />
          <Route path="/relaciones-publicas" element={<DepartmentPage deptId="relaciones-publicas" />} />
          <Route path="/comunidad" element={<DepartmentPage deptId="comunidad" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
