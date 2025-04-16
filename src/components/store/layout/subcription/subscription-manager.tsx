"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { PlanSelector } from "./plan-selector"

interface Plan {
  id: string
  name: string
  description: string
  features: string[]
  price: number
  billingInterval: string
  productLimit: number
  storageLimit: number
  color: string
  popular: boolean
}

interface Subscription {
  id: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  canceledAt: string | null
  plan: Plan
}

interface SubscriptionManagerProps {
  subscription: Subscription
  storeId: string
  plans: Plan[]
  productCount: number
  storageUsed: number // in bytes
}

export function SubscriptionManager({
  subscription,
  storeId,
  plans,
  productCount,
  storageUsed,
}: SubscriptionManagerProps) {
  const [loading, setLoading] = useState(false)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const router = useRouter()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Active
          </Badge>
        )
      case "canceled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Canceled
          </Badge>
        )
      case "past_due":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
            Past Due
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
    }
  }

  const handleCancelSubscription = async () => {
    try {
      setLoading(true)
      await axios.post("/api/subscriptions/cancel", {
        subscriptionId: subscription.id,
        cancelAtPeriodEnd: true,
      })

      toast.success("Subscription Canceled")

      setShowCancelDialog(false)
      router.refresh()
    } catch (error) {
      console.error("Error canceling subscription:", error)
      toast.error("Error")
    } finally {
      setLoading(false)
    }
  }

  const handleUpgradeSuccess = () => {
    setShowUpgradeDialog(false)
    router.refresh()
  }

  // Calculate product usage percentage
  const productLimit = subscription.plan.productLimit
  const productUsagePercent = productLimit === -1 ? 0 : Math.min(100, (productCount / productLimit) * 100)

  // Calculate storage usage
  const storageUsedMB = storageUsed / (1024 * 1024)
  const storageLimit = subscription.plan.storageLimit
  const storageUsagePercent = storageLimit === -1 ? 0 : Math.min(100, (storageUsedMB / storageLimit) * 100)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </div>
        {getStatusBadge(subscription.status)}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">{subscription.plan.name} Plan</h3>
            <p className="text-sm text-muted-foreground">{subscription.plan.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
              }).format(subscription.plan.price)}
              <span className="text-sm font-normal text-muted-foreground">/{subscription.plan.billingInterval}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Current Period</span>
              {subscription.cancelAtPeriodEnd && <span className="text-sm text-red-500">Cancels at period end</span>}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Products</span>
              <span className="text-sm text-muted-foreground">
                {productCount} / {productLimit === -1 ? "Unlimited" : productLimit}
              </span>
            </div>
            {productLimit !== -1 && <Progress value={productUsagePercent} className="h-2" />}
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-sm text-muted-foreground">
                {storageUsedMB.toFixed(2)} MB / {storageLimit === -1 ? "Unlimited" : `${storageLimit} MB`}
              </span>
            </div>
            {storageLimit !== -1 && <Progress value={storageUsagePercent} className="h-2" />}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={subscription.status === "canceled" || subscription.cancelAtPeriodEnd}>
              Cancel Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your subscription? You will still have access until the end of your
                current billing period on {formatDate(subscription.currentPeriodEnd)}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Keep Subscription
              </Button>
              <Button variant="destructive" onClick={handleCancelSubscription} disabled={loading}>
                {loading ? "Canceling..." : "Cancel Subscription"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogTrigger asChild>
            <Button>Upgrade Plan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Upgrade Your Plan</DialogTitle>
              <DialogDescription>Choose a plan that best fits your business needs</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <PlanSelector
                plans={plans}
                storeId={storeId}
                currentPlanId={subscription.plan.id}
                onSuccess={handleUpgradeSuccess}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
