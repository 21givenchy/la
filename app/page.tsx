"use client"

import Hero from "@/components/hero";
import Features from "@/components/features";
import CTA from "@/components/cta";
import Footer from "@/components/Footer";

import { Main, Section, Container,  } from "@/components/craft";
export default function Home() {
  return (
    <Main>
    <Section>
      <Container>
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </Container>
    </Section>
  </Main>
  );
}
