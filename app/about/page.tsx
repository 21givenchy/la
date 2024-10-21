import React from 'react';
import Image from 'next/image';
import ImageWithText from './ImageWithText';


const About: React.FC = () => {
  return (
    <main className="flex flex-col items-center w-full max-w-[1920px] max-md:max-w-full pt-20"> {/* Added padding-top to avoid navbar overlap */}
      
      <section className="px-10 py-4 mt-16 w-44 max-w-full text-xl leading-none text-center uppercase border border-solid border-neutral-800 text-neutral-800 max-md:px-5 max-md:mt-10">
        ABOUT US
      </section>
      
      <section className="mt-16 max-w-full w-[1371px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[51%] max-md:ml-0 max-md:w-full">
            <div className="font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              We re FOR
            </div>
          </div>
       
          <Image
            src="/person.png" 

            alt='person'
            width={192}
            height={108} />
          <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
            <div className="font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:text-4xl">
              anyone
            </div>  
          </div>
        </div>
      </section>
      
      <section className="mt-12 max-w-full w-[1457px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
            <div className="font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              who aspires
            </div>
          </div>
          <ImageWithText imageSrc="" text="" />
        </div>
      </section>
      
      <section className="mt-12 max-w-full w-[1157px] max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[52%] max-md:ml-0 max-md:w-full">
            <div className="font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
              to make 
            </div>
          </div>
          <ImageWithText imageSrc="" text="" />
          <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:text-4xl">
              meaningful impact 
            </div>
          </div>
        </div>
      </section>
      
      <section className="mt-12 font-extrabold leading-none text-center uppercase text-[64px] text-neutral-800 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
         on people and planet
      </section>
    </main>
  );
};

export default About;
