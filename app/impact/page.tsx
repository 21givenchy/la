'use client'

import { useState, useEffect } from 'react'
import { User,   Leaf,  BarChart2, PieChart, TrendingUp, Upload, FileText,  Download, FileDown, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useUser } from '@clerk/nextjs'
import OnboardingSteps from './_components/onboarding-card'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import CarbonCalculator from './_components/carbon-calculator';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"
import NextImage from 'next/image'

interface Metrics {
  carbonFootprint: number;
  waterUsage: number;
  wasteReduction: number;
  communityEngagement: number;
  energyConsumption: number;
}

interface VerificationDocument {
  type: string;
  file: File | null;
  preview?: string;
  description?: string;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  metrics: string[];
}

interface Alignment {
  icon: string;
  label: string;
  activities: Activity[];
}

interface Goal {
  id: string;
  category: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

interface ProgressArea {
  title: string;
  progress: number;
  sdgs: number[];  // SDG numbers (1-17)
  description: string;
}

interface ActivityEntry {
  [key: string]: string;
}

interface ActivityData {
  [activityId: string]: ActivityEntry[];
}

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    carbonFootprint: 0,
    waterUsage: 0,
    wasteReduction: 0,
    communityEngagement: 0,
    energyConsumption: 0,
  });
  const [documents, setDocuments] = useState<VerificationDocument[]>([
    { type: 'odometer', file: null, description: 'Vehicle odometer reading for carbon footprint verification' },
    { type: 'electricity', file: null, description: 'Monthly electricity bill for energy consumption verification' },
    { type: 'water', file: null, description: 'Monthly water bill for water usage verification' },
    { type: 'waste', file: null, description: 'Waste management receipt for waste reduction verification' },
  ])
  const [reportType, setReportType] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportUrl, setReportUrl] = useState<string | null>(null)
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment | null>(null);
  const [activityData, setActivityData] = useState<ActivityData>({});
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      category: 'Environmental',
      title: 'Reduce Carbon Emissions',
      target: 1000,
      current: 750,
      unit: 'kg CO2e',
      deadline: '2024-12-31',
      status: 'in-progress'
    },
    {
      id: '2',
      category: 'Social',
      title: 'Community Volunteer Hours',
      target: 500,
      current: 320,
      unit: 'hours',
      deadline: '2024-12-31',
      status: 'in-progress'
    },
    // Add more goals as needed
  ]);

  useEffect(() => {
    if (isSignedIn) {
      const hasCompletedOnboarding = localStorage.getItem(`onboarding_complete_${user?.id}`);
      setShowOnboarding(!hasCompletedOnboarding);
    }
  }, [isSignedIn, user?.id]);

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

  if (showOnboarding === true) {
    return (
      <div className="min-h-screen">
        <OnboardingSteps 
          onComplete={() => {
            setShowOnboarding(false);
          }} 
        />
      </div>
    );
  }

  
  const alignments: Alignment[] = [
    {
      icon: '👥',
      label: 'Community Support',
      activities: [
        {
          id: 'vol-1',
          name: 'Volunteer Hours',
          description: 'Track time spent volunteering in community programs',
          metrics: ['hours', 'people impacted', 'location']
        },
        {
          id: 'don-1',
          name: 'Donations',
          description: 'Record monetary or resource donations to community causes',
          metrics: ['amount', 'recipient', 'purpose']
        }
      ]
    },
    {
      icon: '🌱',
      label: 'Sustainability',
      activities: [
        {
          id: 'rec-1',
          name: 'Recycling Initiative',
          description: 'Track recycling efforts and waste reduction',
          metrics: ['weight', 'type of materials', 'cost savings']
        },
        {
          id: 'eng-1',
          name: 'Energy Conservation',
          description: 'Monitor and record energy-saving activities',
          metrics: ['kWh saved', 'carbon reduction', 'cost savings']
        }
      ]
    },
    {
      icon: '💼',
      label: 'Ethical Business',
      activities: [
        {
          id: 'eco-1',
          name: 'Eco-Friendly Products',
          description: 'Promote the use of eco-friendly products in your business',
          metrics: ['percentage', 'products', 'cost savings']
        },
        {
          id: 'eco-2',
          name: 'Sustainable Supply Chain',
          description: 'Ensure your supply chain is sustainable',
          metrics: ['percentage', 'suppliers', 'sustainability score']
        }
      ]
    },
    {
      icon: '🌍',
      label: 'Global Awareness',
      activities: [
        {
          id: 'edu-1',
          name: 'Educational Initiatives',
          description: 'Implement educational initiatives to raise global awareness',
          metrics: ['percentage', 'initiatives', 'impact']
        },
        {
          id: 'gov-1',
          name: 'Government Policies',
          description: 'Monitor and record government policies related to sustainability',
          metrics: ['percentage', 'policies', 'impact']
        }
      ]
    },
    {
      icon: '📚',
      label: 'Education Access',
      activities: [
        {
          id: 'edu-2',
          name: 'Educational Programs',
          description: 'Implement educational programs to improve access to education',
          metrics: ['percentage', 'programs', 'impact']
        },
        {
          id: 'edu-3',
          name: 'Educational Resources',
          description: 'Provide educational resources to improve access to education',
          metrics: ['percentage', 'resources', 'impact']
        }
      ]
    },
    {
      icon: '🏛️',
      label: 'Civic Engagement',
      activities: [
        {
          id: 'gov-2',
          name: 'Government Policies',
          description: 'Monitor and record government policies related to civic engagement',
          metrics: ['percentage', 'policies', 'impact']
        },
        {
          id: 'gov-3',
          name: 'Community Programs',
          description: 'Implement community programs to improve civic engagement',
          metrics: ['percentage', 'programs', 'impact']
        }
      ]
    },
    {
      icon: '🤝',
      label: 'Partnerships',
      activities: [
        {
          id: 'par-1',
          name: 'Partnership Initiatives',
          description: 'Implement partnership initiatives to improve community engagement',
          metrics: ['percentage', 'initiatives', 'impact']
        },
        {
          id: 'par-2',
          name: 'Partnership Programs',
          description: 'Implement partnership programs to improve community engagement',
          metrics: ['percentage', 'programs', 'impact']
        }
      ]
    },
    {
      icon: '♻️',
      label: 'Circular Economy',
      activities: [
        {
          id: 'cir-1',
          name: 'Circular Economy Initiatives',
          description: 'Implement circular economy initiatives to improve waste reduction',
          metrics: ['percentage', 'initiatives', 'impact']
        },
        {
          id: 'cir-2',
          name: 'Circular Economy Programs',
          description: 'Implement circular economy programs to improve waste reduction',
          metrics: ['percentage', 'programs', 'impact']
        }
      ]
    },
  ]
  const progressAreas: ProgressArea[] = [
    {
      title: 'Social Impact',
      progress: 75,
      sdgs: [1, 2, 3, 10],
      description: 'Addressing poverty, hunger, health, and reducing inequalities'
    },
    {
      title: 'Environmental Footprint',
      progress: 60,
      sdgs: [6, 7, 13, 14, 15],
      description: 'Clean water, renewable energy, climate action, and biodiversity'
    },
    {
      title: 'Economic Contribution',
      progress: 80,
      sdgs: [8, 9, 12],
      description: 'Decent work, innovation, and responsible consumption'
    },
    {
      title: 'Governance Practices',
      progress: 70,
      sdgs: [16, 17],
      description: 'Peace, justice, and partnerships'
    },
    {
      title: 'Educational Initiatives',
      progress: 85,
      sdgs: [4, 5],
      description: 'Quality education and gender equality'
    }
  ];

  const handleCarbonCalculation = (value: number) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      carbonFootprint: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    setMetrics(prev => ({
      ...prev,
      waterUsage: Number(formData.get('waterUsage')) || prev.waterUsage,
      wasteReduction: Number(formData.get('wasteReduction')) || prev.wasteReduction,
      communityEngagement: Number(formData.get('communityEngagement')) || prev.communityEngagement,
      energyConsumption: Number(formData.get('energyConsumption')) || prev.energyConsumption,
    }));
  };

  const handleFileUpload = (type: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        setDocuments(prev => prev.map(doc => 
          doc.type === type 
            ? { ...doc, file, preview: event.target?.result as string }
            : doc
        ))
      }

      reader.readAsDataURL(file)
    }
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportType,
          metrics,
          timeframe: reportType.toLowerCase(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate report')
      }

      const data = await response.json()
      setReportUrl(data.reportUrl)
      alert('Report generated successfully!')
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report')
    } finally {
      setIsGenerating(false)
    }
  }

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
            <TabsTrigger value="alignments">Alignments</TabsTrigger>
            <TabsTrigger value="progress">Progess</TabsTrigger>
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

          

            {/* Resources and Quizzes sections remain the same */}
          </TabsContent>

          <TabsContent value="input">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Input Daily Impact</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <CarbonCalculator onCalculate={handleCarbonCalculation} />
                    <div>
                      <label htmlFor="waterUsage">Water Usage (liters)</label>
                      <Input name="waterUsage" id="waterUsage" type="number" placeholder="Enter water usage" />
                    </div>
                    <div>
                      <label htmlFor="wasteReduction">Waste Reduction (kg)</label>
                      <Input name="wasteReduction" id="wasteReduction" type="number" placeholder="Enter waste reduction" />
                    </div>
                    <div>
                      <label htmlFor="communityEngagement">Community Engagement (hours)</label>
                      <Input name="communityEngagement" id="communityEngagement" type="number" placeholder="Enter community engagement hours" />
                    </div>
                    <div>
                      <label htmlFor="energyConsumption">Energy Consumption (kWh)</label>
                      <Input name="energyConsumption" id="energyConsumption" type="number" placeholder="Enter energy consumption" />
                    </div>
                    <Button type="submit">Submit Impact Data</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supporting Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {documents.map((doc) => (
                      <div key={doc.type} className="space-y-2">
                        <Label className="text-lg font-semibold capitalize">
                          {doc.type.replace('_', ' ')} Verification
                        </Label>
                        <div className="flex items-start space-x-4">
                          <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">{doc.description}</p>
                            <div className="flex items-center space-x-2">
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileUpload(doc.type)}
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <Button variant="outline" className="relative">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload {doc.type === 'odometer' ? 'Photo' : 'Document'}
                                </Button>
                              </div>
                              {doc.file && (
                                <span className="text-sm text-green-600 flex items-center">
                                  <FileText className="w-4 h-4 mr-1" />
                                  {doc.file.name}
                                </span>
                              )}
                            </div>
                          </div>
                          {doc.preview && (
                            <div className="w-24 h-24 relative border rounded-lg overflow-hidden">
                              <NextImage
                                src={doc.preview}
                                alt={`Preview of ${doc.type}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="reports">
            <section className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Report Type</Label>
                      <Select
                        value={reportType}
                        onValueChange={setReportType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WEEKLY">Weekly Report</SelectItem>
                          <SelectItem value="MONTHLY">Monthly Report</SelectItem>
                          <SelectItem value="QUARTERLY">Quarterly Report</SelectItem>
                          <SelectItem value="ANNUAL">Annual Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      onClick={handleGenerateReport}
                      disabled={!reportType || isGenerating}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <FileDown className="mr-2 h-4 w-4" />
                          Generate Report
                        </>
                      )}
                    </Button>

                    {reportUrl && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(reportUrl, '_blank')}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample Report</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <NextImage
                    src="/sample.jpg" 
                    alt="Sample Report" 
                    className="max-w-full h-auto rounded-lg"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/sample.jpg';
                      link.download = 'sample-report.jpg';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Sample Report
                  </Button>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
          <TabsContent value='alignments'>
            <section className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Alignments</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {alignments.map((alignment) => (
                  <div
                    key={alignment.label}
                    className={`bg-gray-800 p-4 rounded-lg text-center cursor-pointer transition-all hover:bg-gray-700
                      ${selectedAlignment?.label === alignment.label ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedAlignment(alignment)}
                  >
                    <div className="text-4xl mb-2">{alignment.icon}</div>
                    <div className="text-sm">{alignment.label}</div>
                  </div>
                ))}
              </div>

              {selectedAlignment && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>{selectedAlignment.icon}</span>
                      <span>{selectedAlignment.label} Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {selectedAlignment.activities.map((activity) => (
                        <div key={activity.id} className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">{activity.name}</h3>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          
                          <form 
                            className="space-y-4"
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              const data = Object.fromEntries(formData.entries());
                              setActivityData(prev => ({
                                ...prev,
                                [activity.id]: [...(prev[activity.id] || []), data as ActivityEntry]
                              }));
                              (e.target as HTMLFormElement).reset();
                              alert('Activity data recorded successfully!');
                            }}
                          >
                            {activity.metrics.map((metric) => (
                              <div key={metric} className="space-y-2">
                                <Label htmlFor={`${activity.id}-${metric}`}>
                                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                                </Label>
                                <Input
                                  id={`${activity.id}-${metric}`}
                                  name={metric}
                                  required
                                  placeholder={`Enter ${metric}`}
                                />
                              </div>
                            ))}
                            <Button type="submit">Record Activity</Button>
                          </form>

                          {activityData[activity.id]?.map((entry: ActivityEntry, index: number) => (
                            <div key={index} className="text-sm">
                              {Object.entries(entry).map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-medium">{key}: </span>
                                  {value}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
          </TabsContent>
          <TabsContent value='progress'>
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Progress Tracking</h2>
              <Button onClick={() => {
                // Add new goal functionality
                const newGoal: Goal = {
                  id: (goals.length + 1).toString(),
                  category: 'New Category',
                  title: 'New Goal',
                  target: 100,
                  current: 0,
                  unit: 'units',
                  deadline: new Date().toISOString().split('T')[0],
                  status: 'not-started'
                };
                setGoals([...goals, newGoal]);
              }}>
                Add New Goal
              </Button>
            </div>

            <div className="grid gap-6">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            goal.status === 'completed' ? 'default' :
                            goal.status === 'in-progress' ? 'secondary' : 'destructive'
                          }>
                            {goal.category}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {goal.status === 'completed' ? 'Completed' :
                            goal.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                            </div>
                        </div>
                        <CardTitle className="mt-2">{goal.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Update progress functionality
                            const newProgress = prompt('Enter new progress value:');
                            if (newProgress && !isNaN(Number(newProgress))) {
                              const updatedGoals = goals.map(g => 
                                g.id === goal.id 
                                  ? {...g, current: Number(newProgress)} 
                                  : g
                              );
                              setGoals(updatedGoals);
                            }
                          }}
                        >
                          Update Progress
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => {
                            // Delete goal functionality
                            if (confirm('Are you sure you want to delete this goal?')) {
                              setGoals(goals.filter(g => g.id !== goal.id));
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress: {goal.current} / {goal.target} {goal.unit}</span>
                          <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        <span>
                          {goal.current >= goal.target ? (
                            <span className="text-green-500">Goal Achieved! 🎉</span>
                          ) : (
                            `${goal.target - goal.current} ${goal.unit} remaining`
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Overall Progress Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Goals Completed</h3>
                      <p className="text-2xl font-bold">
                        {goals.filter(g => g.status === 'completed').length} / {goals.length}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">In Progress</h3>
                      <p className="text-2xl font-bold">
                        {goals.filter(g => g.status === 'in-progress').length}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">Average Completion</h3>
                      <p className="text-2xl font-bold">
                        {Math.round(
                          goals.reduce((acc, goal) => 
                            acc + (goal.current / goal.target) * 100, 0
                          ) / goals.length
                        )}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 mt-6">
              {progressAreas.map((area) => (
                <Card key={area.title}>
                  <CardHeader>
                    <CardTitle>{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{area.description}</span>
                        <span>{area.progress}%</span>
                      </div>
                      <Progress value={area.progress} />
                      <div className="flex gap-2 mt-2">
                        {area.sdgs.map((sdg) => (
                          <Badge key={sdg} variant="outline">
                            SDG {sdg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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