// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Button } from "@/components/ui/button";

// Custom components
import { Container, Section } from "@/components/craft";

const CTA = () => {
  return (
    <Section>
      <Container className="flex flex-col gap-6">
        <h2 className="!my-0">Ready to Make a Difference?</h2>
        <h4 className="text-muted-foreground">
          <Balancer>
          Start measuring your impact on people and the planet today.
          </Balancer>
        </h4>
        <div className="not-prose flex items-center gap-2">
          <Button asChild>
            <Link href="#">Get Started for free</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Learn More {"->"}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
