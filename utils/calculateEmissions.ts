const EMISSION_FACTORS = {
  transport: {
    car: {
      petrol: 0.192, // kg CO2 per km
      diesel: 0.171,
      hybrid: 0.111,
      electric: 0.053,
    },
    train: 0.041,
    plane: 0.255,
    bus: 0.089,
  }
};

type TransportMode = keyof typeof EMISSION_FACTORS.transport;

export function calculateTransportEmissions(
  mode: TransportMode,
  distance: number,
  frequency: string,
  fuelType?: 'petrol' | 'diesel' | 'hybrid' | 'electric'
) {
  let annualDistance = distance;
  
  // Convert to annual distance based on frequency
  switch (frequency) {
    case 'daily':
      annualDistance *= 365;
      break;
    case 'weekly':
      annualDistance *= 52;
      break;
    case 'monthly':
      annualDistance *= 12;
      break;
  }

  // Calculate emissions
  if (mode === 'car' && fuelType) {
    return annualDistance * EMISSION_FACTORS.transport.car[fuelType];
  }
  
  return annualDistance * (EMISSION_FACTORS.transport[mode] as number);
} 