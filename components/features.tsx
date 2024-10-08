// React and Next.js
import React from "react";

// Layout Components
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Icons
import { Coins } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const featureText: FeatureText[] = [
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Sustainability Metrics",
    description:
      "Identify key sustainability indicators tailored to your business or personal goals.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Impact Tracking",
    description:
      "Monitor and visualize your progress towards sustainable practices and goals.",
  },
  {
    icon: <Coins className="h-6 w-6" />,
    title: "Data Driven Insights",
    description:
      "Gain valuable insights to optimize your sustainability efforts and maximize impact.",
  },
];

const Feature = () => {
  return (
    <Section className="border-b">
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
            We believe that understanding your impact is the first step toward creating positive change.
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
            Explore our key features designed to help you measure, manage, and maximize your positive contributions to the planet and society.
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {icon}
                <h4 className="text-xl text-primary">{title}</h4>
                <p className="text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
