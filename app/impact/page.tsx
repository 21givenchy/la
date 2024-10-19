"use client"

import React, { useState } from 'react';

const Impact: React.FC = () => {
  const [impactData, setImpactData] = useState({
    food: 0,
    transport: 0,
    energy: 0,
    advocacy: 0,
    carbonFootprint: 0,
    water: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof typeof impactData) => {
    setImpactData({
      ...impactData,
      [category]: Number(e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic (e.g., save to database)
    console.log('Daily Impact Recorded:', impactData);
  };

  return (
    <main className="flex flex-col items-center w-full max-w-[1920px] max-md:max-w-full pt-20"> {/* Added padding-top to avoid navbar overlap */}

    <form onSubmit={handleSubmit} className="daily-impact-form">
    <section className="px-10 py-4 mt-16 w-100 max-w-full text-xl leading-none text-center uppercase border border-solid border-neutral-800 text-neutral-800 max-md:px-5 max-md:mt-10">

      <h2>Record Your Daily Impact</h2>
      </section>
      
      {Object.keys(impactData).map((category) => (
        <div key={category}>
          <label>
            {category.charAt(0).toUpperCase() + category.slice(1)}:
            <input
              type="number"
              value={impactData[category as keyof typeof impactData]}
              onChange={(e) => handleChange(e, category as keyof typeof impactData)}
              placeholder="Enter value"
            />
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
    </main>
  );
};

export default  Impact;
