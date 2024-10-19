"use client"

import React, { useState } from 'react';

const impact: React.FC = () => {
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
    <form onSubmit={handleSubmit} className="daily-impact-form">
      <h2>Record Your Daily Impact</h2>
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
  );
};

export default impact;
