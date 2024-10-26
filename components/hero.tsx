import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { ChartLine } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

import Placeholder from "@/public/Discover.png";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


// Asset imports
import Logo from "/public/logo.png";

const Hero = () => {
  return (
    <div className="flex overflow-hidden flex-wrap gap-12 justify-center items-center bg-emerald-50">
      <div className="flex flex-wrap flex-1 shrink justify-center items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink justify-center items-center self-stretch px-10 py-12 my-auto text-center rounded-2xl basis-0 min-w-[320px] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col justify-center w-full max-w-[940px] min-w-[304px] max-md:max-w-full">
            <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="text-7xl font-extrabold tracking-tighter text-emerald-900 leading-[78px] max-md:max-w-full max-md:text-4xl max-md:leading-10">
                <Balancer>
                  Track Your Impact Today
                </Balancer>
              </div>
              <div className="mt-4 text-lg leading-7 text-emerald-600 max-md:max-w-full">
                <Balancer>
                  Our platform empowers individuals and businesses to measure sustainability metrics and track their positive impact on the environment and society.
                </Balancer>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-center self-center mt-10 w-full text-sm leading-relaxed max-w-[680px] max-md:max-w-full">
              <div className="flex flex-1 shrink gap-1 justify-center items-center self-stretch px-6 py-3 my-auto text-emerald-50 bg-lime-600 rounded-lg basis-0 min-h-[53px] min-w-[140px] max-md:px-5">
                <Link href="/Impact" className="gap-2 self-stretch p-1 my-auto">
                  Start Tracking Now
                </Link>
              </div>
              <div className="flex flex-1 shrink gap-1 justify-center items-center self-stretch px-6 py-4 my-auto text-emerald-900 rounded-lg border border-emerald-400 border-solid basis-0 min-h-[53px] min-w-[140px] max-md:px-5">
                <Link href="/learn-more" className="gap-2 self-stretch px-1 my-auto">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 shrink gap-0 justify-center items-end self-stretch py-16 my-auto bg-pink-200 basis-20 min-w-[320px] max-md:max-w-full">
          <div className="flex flex-col min-w-[240px] w-[264px]">
            <div className="flex relative z-10 flex-col justify-center px-7 py-8 mt-0 aspect-[0.524] max-md:px-5 max-md:-mr-1.5">
              
         
              <Image
                loading="lazy"
                src={Placeholder}
                alt="Hero Image"
                className="object-fit aspect-[0.46] w-[400px]"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
