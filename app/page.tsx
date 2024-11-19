"use client"

import Hero from "@/components/hero";
import Features from "@/components/features";
import Benefits from "@/components/Benefits";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";
import Steps
 from "@/components/steps";
import { Main } from "@/components/craft";
export default function Home() {
  return (
    <Main className=" flex min-h-screen flex-col items-center justify-between" >
    
      
        <Hero />
        <Features />
        <Steps />
        <Benefits />
        <CTA />
        <Footer />
      
    
  </Main>
  );
}
