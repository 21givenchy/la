'use client'

import { useState } from 'react'
import { User, Bell, ChevronDown, Brain, Map, Leaf, Trophy, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useUser, useSignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Dashboard() {
  const { isLoaded } = useSignIn();
  const { isSignedIn, user } = useUser();
  const [activeCategory, setActiveCategory] = useState('All')

  if (!isLoaded) {
    return <div>Loading...</div>;
  }


  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-extrabold">Please sign in to access this page.</div>
      </div>
    ); // Optionally redirect or show a message
  }

  const categories = ['All', 'Social', 'Environmental', 'Economic', 'Governance', 'Education']
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
  const resources = [
    { title: 'Sustainable Development Goals', image: '/placeholder.svg?height=100&width=200' },
    { title: 'Corporate Social Responsibility', image: '/placeholder.svg?height=100&width=200' },
    { title: 'Environmental, Social, and Governance (ESG)', image: '/placeholder.svg?height=100&width=200' },
    { title: 'Impact Investing', image: '/placeholder.svg?height=100&width=200' },
    { title: 'Social Entrepreneurship', image: '/placeholder.svg?height=100&width=200' },
  ]
  const quizzes = [
    { icon: Brain, label: 'Impact Awareness' },
    { icon: Map, label: 'Global Challenges' },
    { icon: Leaf, label: 'Sustainability Practices' },
    { icon: Trophy, label: 'Leadership in Action' },
    { icon: Lock, label: 'Ethical Decision Making' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold"></h1>
          <nav className="space-x-4">
            <Button variant="ghost"></Button>
            <Button variant="ghost"></Button>
            <Button variant="ghost"></Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6" />
            <div className="flex items-center">
              <User className="h-6 w-6 mr-2" />
              <span>Hello, {user.firstName}!</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Record daily impact</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
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

        <section>
          <h2 className="text-2xl font-bold mb-4">Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {resources.map((resource) => (
              <div key={resource.title} className="relative group">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <span className="text-center p-2">{resource.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quizzes.map((quiz) => (
              <Button key={quiz.label} variant="outline" className="h-24 flex flex-col items-center justify-center">
                <quiz.icon className="h-8 w-8 mb-2" />
                <span>{quiz.label}</span>
              </Button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
