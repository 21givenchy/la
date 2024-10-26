import { BarChart3, Users, Clock, FileText, LineChart, Leaf } from 'lucide-react'

export default function Features() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-green-600 font-semibold mb-2">Key Features</p>
        <h1 className="text-5xl font-bold text-green-900 mb-4">Impact Visualizer</h1>
        <p className="text-xl text-green-700 mb-12">
          Easily visualize your sustainability efforts and their impact on the planet and communities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <feature.icon className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h2>
              <p className="text-green-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: Leaf,
    title: "Sustainability Goals",
    description: "Set and monitor your sustainability goals to ensure you are making a difference."
  },
  {
    icon: BarChart3,
    title: "Data Insights",
    description: "Gain insights from your data to make informed decisions for a sustainable future."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Engage with a community of like-minded individuals and businesses committed to sustainability."
  },
  {
    icon: Clock,
    title: "Real-Time Tracking",
    description: "Track your impact in real-time and adjust your strategies for maximum effectiveness."
  },
  {
    icon: FileText,
    title: "Custom Reports",
    description: "Generate custom reports to showcase your sustainability achievements and progress."
  },
  {
    icon: LineChart,
    title: "Impact Assessment",
    description: "Assess your impact on both people and the planet with comprehensive metrics."
  }
]