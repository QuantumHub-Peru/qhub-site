import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlatformSection from "@/components/PlatformSection";

const PlataformaPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <PlatformSection />
    </div>
    <Footer />
  </div>
);

export default PlataformaPage;
