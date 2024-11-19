'use client'

import React, { useState, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from 'lucide-react'
import { createOrganization } from '@/utils/actions/create-organization'

interface FormData {
  org_name: string;
  org_size: number;
  industry: string;
  transport: {
    car_usage: number;
    train_usage: number;
    plane_usage: number;
  };
  electricity_consumption: number;
  water_usage: number;
  waste_management: number;
}

const initialFormData: FormData = {
  org_name: "",
  org_size: 0,
  industry: "",
  transport: {
    car_usage: 0,
    train_usage: 0,
    plane_usage: 0,
  },
  electricity_consumption: 0,
  water_usage: 0,
  waste_management: 0,
}

export default function OnboardingCard({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const { user } = useUser()
  const router = useRouter()

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('transport.') ? {
        ...prev.transport,
        [name.split('.')[1]]: Number(value)
      } : Number(value) || value
    }))
  }, [])

  const handleSelectChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, industry: value }))
  }, [])

  const nextStep = useCallback(() => setCurrentStep(prev => Math.min(prev + 1, 4)), [])
  const prevStep = useCallback(() => setCurrentStep(prev => Math.max(prev - 1, 1)), [])

  const onSubmit = useCallback(async () => {
    try {
      if (!user || !user.id) {
        throw new Error("User is not authenticated")
      }

      const organizationData = {
        ...formData,
        userId: user.id,
        currentStep: currentStep,
        org_site: "",
        org_email: "",
        org_phone: "",
        org_address: "",
        org_city: "",
        org_state: "",
        org_zip: "",
        org_country: "",
        org_description: "",
        org_logo: "",
        sustainability_data: undefined,
      }

      const result = await createOrganization(organizationData)

      if (result.success) {
        localStorage.setItem(`onboarding_complete_${user.id}`, 'true')
        toast.success("Thank you for joining! Your organization has been registered successfully.")
        onComplete()
        router.push('/impact')
      } else {
        toast.error(result.message || "Failed to create organization")
      }
    } catch (error) {
      console.error("Error creating organization:", error)
      toast.error("An unexpected error occurred. Please try again.")
    }
  }, [formData, user, currentStep, onComplete, router])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
           <h3 className="text-lg font-semibold">What is your organization’s name?</h3>
            <Input name="org_name" value={formData.org_name} onChange={handleInputChange} placeholder='Organization Name' />
            <h3 className="text-lg font-semibold">How many employees do you have?</h3>
            <Input name="org_size" type="number" value={formData.org_size} onChange={handleInputChange} placeholder='Number of employees' />
            <h3 className="text-lg font-semibold">What industry does your organization belong to?</h3>
          
            <Select onValueChange={handleSelectChange} value={formData.industry}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      case 2:
        return (
          <>
          <h3 className="text-lg font-semibold">What is your monthly car usage (km)?</h3>
            <Input name="transport.car_usage" type="number" value={formData.transport.car_usage} onChange={handleInputChange} placeholder='Monthly Car Usage (km)' />
            <h3 className="text-lg font-semibold">What is your monthly train usage (km)?</h3>
          
            <Input name="transport.train_usage" type="number" value={formData.transport.train_usage} onChange={handleInputChange} placeholder='Monthly Train Usage (km)' />
            <h3 className="text-lg font-semibold">What is your monthly air travel (km)?</h3>
            <Input name="transport.plane_usage" type="number" value={formData.transport.plane_usage} onChange={handleInputChange} placeholder='Monthly Air Travel (km)' />
          </>
        )
      case 3:
        return (
          <>
           <h3 className="text-lg font-semibold">What is your monthly electricity consumption (kWh)?</h3>
            <Input name="electricity_consumption" type="number" value={formData.electricity_consumption} onChange={handleInputChange} placeholder='Monthly Electricity Consumption (kWh)' />
            <h3 className="text-lg font-semibold">What is your monthly water usage (liters)?</h3>
            <Input name="water_usage" type="number" value={formData.water_usage} onChange={handleInputChange} placeholder='Monthly Water Usage (liters)' />
            <h3 className="text-lg font-semibold">What is your monthly waste generated (kg)?</h3>
            <Input name="waste_management" type="number" value={formData.waste_management} onChange={handleInputChange} placeholder='Monthly Waste Generated (kg)' />
          </>
        )
      case 4:
        return (
          <div className='flex flex-col w-full gap-3 justify-center items-center'>
            <Check className='text-white-500 w-[3.5rem] h-[3.5rem] border rounded-full p-3 bg-green-500' />
            <h2 className='text-lg font-medium'>Almost there</h2>
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        )
    }
  }

  // Progress bar implementation
  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="mb-4">Welcome to frontforumfocus</CardTitle>
            <Button 
              variant="ghost" 
              onClick={() => {
                onComplete();
                router.push('/impact');
              }}
            >
              Cancel
            </Button>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-300 ease-in-out -translate-y-1/2"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>
          {currentStep !== 4 && (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}