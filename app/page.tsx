"use client";
import CTA from "@/components/Cta";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Manifesto />
      <TechStack />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
