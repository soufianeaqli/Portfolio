import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import GlobalSceneWrapper from "@/components/canvas/GlobalSceneWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col selection:bg-red-500/30 selection:text-white">
      <CustomCursor />
      <GlobalSceneWrapper />
      
      <Navbar />
      
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Contact />

      <Footer />
    </main>
  );
}
