import Image from 'next/image'

export default function Steps() {
  return (
    <div className="bg-[#e6fff7] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#006644] mb-4">How It Works</h1>
        <p className="text-lg md:text-xl text-center text-[#006644] mb-12">
          Discover how our platform helps you track and improve your sustainability efforts.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Sign Up",
              description: "Create an account and complete a short assessment of your activities and passions.",
              image: "/placeholder.svg?height=200&width=300"
            },
            {
              title: "Set Goals",
              description: "Based on your assessment, set personalized sustainability goals and metrics.",
              image: "/placeholder.svg?height=200&width=300"
            },
            {
              title: "Track Progress",
              description: "Monitor your impact over time by logging daily activities and tracking goal progress.",
              image: "/placeholder.svg?height=200&width=300"
            }
          ].map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={step.image}
                alt={`Step ${index + 1}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-[#006644] mb-2">Step {index + 1}</p>
                <h2 className="text-xl font-bold text-[#006644] mb-2">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}