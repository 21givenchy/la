
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { ChartLine } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button,  } from "@/components/ui/button";

import Placeholder from "@/public/Discover.png";
import {  SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


// Asset imports
import Logo from "/public/logo.png";

const Hero = () => {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <Image
          src={Logo}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        />
        <h1 className="!mb-0">
          <Balancer>
          Empower Your Impact: Transforming Sustainability Together.
          </Balancer>
        </h1>
        <h3 className="text-muted-foreground">
          <Balancer>
          Join us in measuring your impact on people and the planet.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild >
            <Link href="/Impact">
              <ChartLine className="mr-2" />
              Get Started
            </Link>
           
      
          </Button>
          
          <Button variant={"ghost"} asChild>
            <Link href="/sign-in">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> -{">"}
            </Link>
          </Button>

        </div>
        <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl
">
             
<Image     
className="h-full w-full object-cover object-bottom"
src={Placeholder}
width={1920}
height={1080}
alt="hero image"  
placeholder="blur"

            />
            </div>
      </Container>
    </Section>
  );
};

export default Hero;
