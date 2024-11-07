import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CarbonCalculator({ onCalculate }: { onCalculate: (value: number) => void }) {
  const [electricity, setElectricity] = useState(0);
  const [travel, setTravel] = useState(0);

  const calculateCarbonFootprint = () => {
    // Simple calculation: 0.5 kg CO2e per kWh and 0.2 kg CO2e per km
    const carbonFootprint = (electricity * 0.5) + (travel * 0.2);
    onCalculate(carbonFootprint);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="electricity">Electricity Usage (kWh)</label>
        <Input
          id="electricity"
          type="number"
          value={electricity}
          onChange={(e) => setElectricity(Number(e.target.value))}
          placeholder="Enter electricity usage"
        />
      </div>
      <div>
        <label htmlFor="travel">Travel Distance (km)</label>
        <Input
          id="travel"
          type="number"
          value={travel}
          onChange={(e) => setTravel(Number(e.target.value))}
          placeholder="Enter travel distance"
        />
      </div>
      <Button onClick={calculateCarbonFootprint}>Calculate Carbon Footprint</Button>
    </div>
  );
} 