'use client'

import { useState, useEffect } from 'react'
import { User,   Leaf,  BarChart2, PieChart, TrendingUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useUser, useSignIn } from '@clerk/nextjs'
import OnboardingSteps from './_components/onboarding-card'
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import CarbonCalculator from './_components/carbon-calculator';

export default function Dashboard() {
  const { isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [metrics, setMetrics] = useState({
    carbonFootprint: 0,
    waterUsage: 0,
    wasteReduction: 0,
    communityEngagement: 0,
    energyConsumption: 0
  })

  useEffect(() => {
    // Fetch user metrics from API or local storage
    // For now, we'll use dummy data
    setMetrics({
      carbonFootprint: 1500,
      waterUsage: 3000,
      wasteReduction: 500,
      communityEngagement: 20,
      energyConsumption: 2500
    })
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-extrabold">Please sign in to access this page.</div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gray-900">
        <OnboardingSteps 
          onComplete={() => setShowOnboarding(false)} 
        />
      </div>
    );
  }

  
  const alignments = [
    { icon: '👥', label: 'Community Support' },
    { icon: '🌱', label: 'Sustainability' },
    { icon: '💼', label: 'Ethical Business' },
    { icon: '🌍', label: 'Global Awareness' },
    { icon: '📚', label: 'Education Access' },
    { icon: '🏛️', label: 'Civic Engagement' },
    { icon: '🤝', label: 'Partnerships' },
    { icon: '♻️', label: 'Circular Economy' },
  ]
  const progressAreas = [
    { title: 'Social Impact', progress: 75 },
    { title: 'Environmental Footprint', progress: 60 },
    { title: 'Economic Contribution', progress: 80 },
    { title: 'Governance Practices', progress: 70 },
    { title: 'Educational Initiatives', progress: 85 },
  ]

  const handleCarbonCalculation = (value: number) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      carbonFootprint: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        {/* Header content remains the same */}
      </header>

      <main className="container mx-auto p-4 pt-24 space-y-8">
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="input">Input Data</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <section>
              <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MetricCard title="Carbon Footprint" value={metrics.carbonFootprint} unit="kg CO2e" icon={BarChart2} />
                <MetricCard title="Water Usage" value={metrics.waterUsage} unit="liters" icon={TrendingUp} />
                <MetricCard title="Waste Reduction" value={metrics.wasteReduction} unit="kg" icon={PieChart} />
                <MetricCard title="Community Engagement" value={metrics.communityEngagement} unit="hours" icon={User} />
                <MetricCard title="Energy Consumption" value={metrics.energyConsumption} unit="kWh" icon={Leaf} />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Alignments</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {alignments.map((alignment) => (
                  <div key={alignment.label} className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-4xl mb-2">{alignment.icon}</div>
                    <div className="text-sm">{alignment.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
              <div className="grid gap-4">
                {progressAreas.map((area) => (
                  <div key={area.title} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>{area.title}</span>
                      <span>{area.progress}%</span>
                    </div>
                    <Progress value={area.progress} className="w-full" />
                  </div>
                ))}
              </div>
            </section>

            {/* Resources and Quizzes sections remain the same */}
          </TabsContent>

          <TabsContent value="input">
            <section>
              <h2 className="text-2xl font-bold mb-4">Input Daily Impact</h2>
              <form className="space-y-4">
                <CarbonCalculator onCalculate={handleCarbonCalculation} />
                <div>
                  <label htmlFor="waterUsage">Water Usage (liters)</label>
                  <Input id="waterUsage" type="number" placeholder="Enter water usage" />
                </div>
                <div>
                  <label htmlFor="wasteReduction">Waste Reduction (kg)</label>
                  <Input id="wasteReduction" type="number" placeholder="Enter waste reduction" />
                </div>
                <div>
                  <label htmlFor="communityEngagement">Community Engagement (hours)</label>
                  <Input id="communityEngagement" type="number" placeholder="Enter community engagement hours" />
                </div>
                <div>
                  <label htmlFor="energyConsumption">Energy Consumption (kWh)</label>
                  <Input id="energyConsumption" type="number" placeholder="Enter energy consumption" />
                </div>
                <Button type="submit">Submit Impact Data</Button>
              </form>
            </section>
          </TabsContent>

          <TabsContent value="reports">
            <section>
              <h2 className="text-2xl font-bold mb-4">Generate Reports</h2>
              <div className="space-y-4">
                <Select>
                  <option>Weekly Report</option>
                  <option>Monthly Report</option>
                  <option>Quarterly Report</option>
                  <option>Annual Report</option>
                </Select>
                <Button>Generate Report</Button>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function MetricCard({ 
  title,
  value,
  unit,
  icon: Icon 
}: {
  title: string,
  value: number,
  unit: string,
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value} {unit}</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  )
}