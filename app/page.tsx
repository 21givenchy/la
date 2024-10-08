"use client"
import Image from "next/image";
import Hero from "@/components/hero";
import Features from "@/components/features";

import { Main, Section, Container, Box } from "@/components/craft";
export default function Home() {
  return (
    <Main>
    <Section>
      <Container>
        <Hero />
        <Features />
      </Container>
    </Section>
  </Main>
  );
}
