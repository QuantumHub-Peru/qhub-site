import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsSection from "@/components/WhatIsSection";
import StatsSection from "@/components/StatsSection";
import WorldMapSection from "@/components/WorldMapSection";
import CollaboratorsSection from "@/components/CollaboratorsSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import PlatformSection from "@/components/PlatformSection";
import CourseSection from "@/components/CourseSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhatIsSection />
      <StatsSection />
      <WorldMapSection />
      <CollaboratorsSection />
      <DepartmentsSection />
      <PlatformSection />
      <CourseSection />
      <Footer />
    </div>
  );
};

export default Index;
