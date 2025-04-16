"use client"

import { useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation"
import { loadRazorpayScript } from "@/lib/razorpay/razorpay-loader"
import toast from "react-hot-toast"

interface Plan {
    id: string
    name: string
    description: string
    features: string[]
    price: number
    billingInterval: string
    color: string
    popular: boolean
}

interface PlanSelectorProps {
    plans: Plan[]
    storeId: string
    currentPlanId?: string
    onSuccess?: () => void
}

export function PlanSelector({ plans, storeId, currentPlanId, onSuccess }: PlanSelectorProps) {
    const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId || plans[0]?.id)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSelectPlan = async () => {
        try {
            setLoading(true)

            // Create subscription in Razorpay
            const response = await axios.post("/api/subscriptions/create", {
                storeId,
                planId: selectedPlanId,
            })

            // Load Razorpay script
            const isScriptLoaded = await loadRazorpayScript()
            if (!isScriptLoaded) {
                toast.error("Error")
                return
            }

            // Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                subscription_id: response.data.razorpaySubscription.id,
                name: "E-commerce CMS",
                description: `${response.data.plan.name} Plan Subscription`,
                handler: async (response: any) => {
                    try {
                        // Verify payment
                        const verifyResponse = await axios.post("/api/subscriptions/verify", {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            storeId,
                            planId: selectedPlanId,
                        })

                        if (verifyResponse.data.success) {
                            toast.success("Success")

                            // Refresh the page or call onSuccess callback
                            if (onSuccess) {
                                onSuccess()
                            } else {
                                router.refresh()
                            }
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error)
                        toast.error("Error")
                    }
                },
                prefill: {
                    name: response.data.user.name,
                    email: response.data.user.email,
                    contact: response.data.user.phone,
                },
                theme: {
                    color: "#624CF5",
                },
            }

            // Open Razorpay checkout
            const razorpay = new (window as any).Razorpay(options)
            razorpay.open()
        } catch (error) {
            console.error("Error creating subscription:", error)
            toast.error("Error")
        } finally {
            setLoading(false)
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <Card
                        key={plan.id}
                        className={cn(
                            "relative overflow-hidden transition-all duration-300",
                            selectedPlanId === plan.id ? "border-2 shadow-lg" : "border hover:border-primary hover:shadow-md",
                            selectedPlanId === plan.id && `border-[${plan.color}]`,
                        )}
                        style={{
                            borderColor: selectedPlanId === plan.id ? plan.color : undefined,
                        }}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 right-0">
                                <div
                                    className="px-3 py-1 text-xs font-medium text-white rounded-bl-lg flex items-center gap-1"
                                    style={{ backgroundColor: plan.color }}
                                >
                                    <Sparkles className="h-3 w-3" />
                                    Popular
                                </div>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <div className="flex items-baseline mt-2">
                                <span className="text-3xl font-bold">{formatPrice(plan.price)}</span>
                                <span className="ml-1 text-sm text-muted-foreground">/{plan.billingInterval}</span>
                            </div>
                            <CardDescription className="mt-2">{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: plan.color }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant={selectedPlanId === plan.id ? "default" : "outline"}
                                className="w-full"
                                onClick={() => setSelectedPlanId(plan.id)}
                            >
                                {selectedPlanId === plan.id ? "Selected" : "Select"}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSelectPlan} disabled={loading || !selectedPlanId} className="px-8">
                    {loading ? "Processing..." : "Subscribe Now"}
                </Button>
            </div>
        </div>
    )
}
