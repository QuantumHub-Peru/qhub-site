import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseSection from "@/components/CourseSection";

const Curso = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-20">
      <CourseSection />
    </div>
    <Footer />
  </div>
);

export default Curso;
