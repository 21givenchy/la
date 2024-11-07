'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
import { createChurchSchema } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, CheckCircle2 } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from "zod"
import { createOrganization } from '@/utils/actions/create-organization'

// Update the interface to remove userId
interface OnboardingStepsProps {
  onComplete: () => void;
}

export default function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const totalSteps = 4
  const { user, isLoaded } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [showThankYou, setShowThankYou] = useState(false)

  const form = useForm<z.infer<typeof createChurchSchema>>({
    resolver: zodResolver(createChurchSchema),
    defaultValues: {
      org_name: "frontforumfocus",
      org_site: "https://www.frontforumfocus.tech",
      org_email: "frontforumfocus@gmail.com",
      org_phone: "(289) 946-1487",
      org_address: "65 Sunrise Ave.",
      org_city: "Excel sheets",
      org_state: "Carbon Footprint",
      org_zip: "hybrid grid eg solar",
      org_country: "Kenya",
      org_description: "Empowering businesses to make a positive impact.",
      org_logo: "",
      userId: '',
    }
  })

  useEffect(() => {
    if (isLoaded && user) {
      form.setValue('userId', user.id)
    }
  }, [isLoaded, user, form])

  async function onSubmit(data: z.infer<typeof createChurchSchema>) {
    setIsSubmitting(true);
    try {
      if (!user || !user.id) {
        throw new Error("User is not authenticated");
      }

      const result = await createOrganization(data);

      if (result.success) {
        toast.success("Thank you for joining! Your organization has been registered successfully.");
        // Show a more detailed success message
        toast.message("Welcome to frontforumfocus!", {
          description: "We're excited to help you track and improve your impact. Redirecting you to your dashboard...",
          duration: 5000,
        });
        
        setShowThankYou(true);
        setTimeout(() => {
          onComplete();
          router.push('/impact');
        }, 3000);
      } else {
        toast.error(result.message || "Failed to create organization");
      }
    } catch (error) {
      console.error("Error creating organization:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  // if (!isLoaded) {
  //   return <div>Loading...</div>
  // }

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-2xl text-center p-8">
          <CardHeader>
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2">Thank You for Joining!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Your organization has been successfully registered. We&apos;re excited to help you track and improve your impact.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting you to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="mb-4">Welcome to frontforumfocus</CardTitle>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary transition-all duration-300 ease-in-out -translate-y-1/2"
              style={{ width: `${(isCompleted ? totalSteps : currentStep - 1) / (totalSteps - 1) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted || currentStep >= step ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-400'
                    } transition-colors duration-300 ease-in-out z-10`}>
                    {isCompleted || currentStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3 mt-4">
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="org_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Grace Bible Fellowship Church' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_site"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='https://frontforumfocus.up.railway.app' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Org size</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='99-1000' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder='A brief description of your organization.' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="org_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='frontforumfocus@gmail.com' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='(123) 456-7890' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="org_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Kenya' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How do you currently collect sustainability data?</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Excel sheets' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key sustainability metrics you want to track</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Carbon footprint' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current sustainability initiatives</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='hybrid grid eg solar' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="org_country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='USA' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {currentStep === 4 && (
                <div className='flex flex-col w-full gap-3 justify-center items-center'>
                  <Check className='text-white-500 w-[3.5rem] h-[3.5rem] border rounded-full p-3 bg-green-500' />
                  <h2 className='text-lg font-medium'>Almost there</h2>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className={`${currentStep === 1} ? "visibility"`} type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isCompleted}>
            Previous
          </Button>
          {currentStep !== totalSteps && (
            <Button type="button" onClick={nextStep} disabled={isCompleted}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}