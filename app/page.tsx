import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Process from "@/components/sections/process";
import Projects from "@/components/sections/projects";
import Testimonials from "@/components/sections/testimonials";
import Community from "@/components/sections/community";
import Faq from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import { RevealSection } from "@/components/shared/reveal-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <RevealSection>
        <Hero />
      </RevealSection>
      <RevealSection>
        <About />
      </RevealSection>
      <Projects />
      <Skills />
      <Process />
      <Testimonials />
      <Community />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
