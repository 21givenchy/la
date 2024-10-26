import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Target, Shield, BarChart2, Users } from "lucide-react"


export default function Benefits() {
  const benefits = [
    {
      icon: <Lightbulb className="h-8 w-8 text-green-600" />,
      title: "Enhanced Awareness",
      description: "Understand your actions and their effects on the environment and society to make informed decisions."
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Goal Setting and Achievement",
      description: "Set specific sustainability goals and monitor your progress toward achieving them."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Accountability",
      description: "Foster a sense of responsibility by regularly measuring your impact, encouraging sustainable practices."
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-green-600" />,
      title: "Data-Driven Insights",
      description: "Access real-time data to identify areas for improvement and optimize your sustainability efforts."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community Engagement",
      description: "Share your impact metrics to inspire others and foster collaboration on sustainability initiatives."
    }
  ]

  return (
    <div className="bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-green-800 sm:text-4xl">
            Benefits of Tracking
          </h2>
          <p className="mt-4 text-xl text-green-600">
            Why You Should Track Your Impact
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  {benefit.icon}
                  <span className="ml-2">{benefit.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
     
          <p className="mt-4 text-green-600">
            Our user-friendly interface makes tracking your impact easy and engaging
          </p>
        </div>
      </div>
    </div>
  )
}