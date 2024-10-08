"use client"
import Image from "next/image";
import Hero from "@/components/hero";

import { Main, Section, Container, Box } from "@/components/craft";
export default function Home() {
  return (
    <Main>
    <Section>
      <Container>
        <Hero />
      </Container>
    </Section>
  </Main>
  );
}
