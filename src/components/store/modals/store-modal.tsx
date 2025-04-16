"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { plans } from "@/constants"
import DecorativeElements from "./deocrative-elements"
import { useRouter } from "next/navigation"
import { loadRazorpayScript } from "@/lib/razorpay/razorpay-loader"

const formSchema = z.object({
  name: z.string().min(2, { message: "Store name must be at least 2 characters" }),
  description: z.string().max(200, { message: "Description must be less than 200 characters" }).optional(),
  subscriptionPlan: z.enum(["starter", "professional", "enterprise"], {
    required_error: "Please select a subscription plan",
  }),
})

type FormValues = z.infer<typeof formSchema>

const StoreModal = () => {

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      subscriptionPlan: "professional",
    },
  })

  const onSubmit = async (values: FormValues) => {

    try {

      console.log(values)
      setLoading(true)
      const createResponse = await axios.post("/api/stores/create", values);
      console.log(createResponse)
      const isScriptLoaded = await loadRazorpayScript();

      if (!isScriptLoaded) {
        toast.error("Error! Please try again.")
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: createResponse.data.razorpaySubscriptions.id,
        name: createResponse.data.user.user_name,
        description: "Subscription Payment",
        handler: async (response: any) => {
          const verifyResponse = await axios.post("/api/stores/validate", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_plan_id: createResponse.data.razorpaySubscriptions.plan_id,
            storeId: createResponse.data.store.id,
          });
          if (verifyResponse.data.msg === "success") {
            toast.success("Store created sucessfully")
            router.push(`/store/${createResponse.data.store.id}`)
          } else {
            toast.error("Error! Payment validation failed.");
          }
        },
        prefill: {
          email: createResponse.data.user.user_email,
          contact: createResponse.data.user.user_phone,
        },
        theme: {
          color: "#624CF5",
        },
      }

      const razorpay = new (window as any).Razorpay(options)
      razorpay.open()

      setLoading(false)

    } catch (error) {
      console.log(error)
      toast.error("Error! Something went wrong! Please try again.")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-[#050A18] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="relative w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3D00] via-[#FF00E5] to-[#7000FF] rounded-lg blur opacity-30"></div>
          <div className="relative bg-[#050A18]/95 border border-[#1E293B] rounded-lg backdrop-blur-sm overflow-hidden p-8">
            <div className="relative">
              <DecorativeElements />

              <div className="relative z-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] text-transparent bg-clip-text">
                  Create your store
                </h1>
                <p className="text-[#A4B8D3] mt-2 mb-8">Set up your e-commerce store and choose a subscription plan</p>

                <div className="max-w-3xl">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="space-y-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-base">Store name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="My Awesome Store"
                                  disabled={loading}
                                  {...field}
                                  className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5] focus-visible:border-[#FF00E5] h-10"
                                />
                              </FormControl>
                              <FormMessage className="text-[#FF3D00]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-base">Description (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="A brief description of your store"
                                  disabled={loading}
                                  {...field}
                                  value={field.value || ""}
                                  className="bg-[#0A1228] border-[#1E293B] text-white focus-visible:ring-[#FF00E5] focus-visible:border-[#FF00E5] h-10"
                                />
                              </FormControl>
                              <FormDescription className="text-[#A4B8D3]">
                                Help customers understand what your store is about
                              </FormDescription>
                              <FormMessage className="text-[#FF3D00]" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-5 pt-6">
                        <div className="relative">
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
                          <h3 className="text-xl font-medium text-white pt-6">Select a subscription plan</h3>
                          <p className="text-[#A4B8D3] mt-1">Choose the plan that best fits your business needs</p>
                        </div>

                        <FormField
                          control={form.control}
                          name="subscriptionPlan"
                          render={({ field }) => (
                            <FormItem className="space-y-5">
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="space-y-4"
                                >
                                  {plans.map((plan) => (
                                    <div key={plan.id} className="group">
                                      <FormItem
                                        className={cn(
                                          "relative flex items-start p-5 rounded-lg border border-[#1E293B] cursor-pointer transition-all duration-200",
                                          field.value === plan.id && `border-[${plan.color}]`,
                                          "hover:border-[#FF00E5] hover:shadow-[0_0_15px_rgba(255,0,229,0.2)]",
                                        )}
                                        onClick={() =>
                                          form.setValue(
                                            "subscriptionPlan",
                                            plan.id as "starter" | "professional" | "enterprise",
                                          )
                                        }
                                        style={{
                                          borderColor: field.value === plan.id ? plan.color : undefined,
                                          backgroundColor: field.value === plan.id ? `${plan.color}08` : undefined,
                                        }}
                                      >
                                        <div
                                          className={cn(
                                            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
                                            field.value === plan.id ? "opacity-100" : "group-hover:opacity-50",
                                          )}
                                          style={{
                                            background: `radial-gradient(circle at center, ${plan.color}15 0%, transparent 70%)`,
                                          }}
                                        ></div>

                                        {plan.popular && (
                                          <div className="absolute -top-2.5 right-3 z-10">
                                            <div className="bg-gradient-to-r from-[#FF00E5] to-[#7000FF] text-white text-xs rounded-full px-2 py-1 flex items-center shadow-[0_0_10px_rgba(255,0,229,0.5)]">
                                              <Sparkles className="h-3 w-3 mr-1" />
                                              Popular
                                            </div>
                                          </div>
                                        )}
                                        <FormControl>
                                          <RadioGroupItem value={plan.id} className="sr-only" />
                                        </FormControl>

                                        <div className="flex flex-col sm:flex-row w-full gap-4 relative z-10">
                                          <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                              <FormLabel
                                                className="text-lg font-medium cursor-pointer"
                                                style={{ color: field.value === plan.id ? plan.color : "white" }}
                                              >
                                                {plan.name}
                                              </FormLabel>
                                              <span
                                                className="text-base font-bold"
                                                style={{ color: field.value === plan.id ? plan.color : "#A4B8D3" }}
                                              >
                                                {plan.price}
                                              </span>
                                            </div>
                                            <p className="text-sm text-[#A4B8D3] mt-1">{plan.description}</p>
                                          </div>

                                          <div className="sm:w-1/2 flex-shrink-0">
                                            <ul className="grid grid-cols-1 gap-2">
                                              {plan.features.map((feature, index) => (
                                                <li key={index} className="text-sm flex items-start">
                                                  <Check
                                                    className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                                                    style={{ color: plan.color }}
                                                  />
                                                  <span className="text-[#A4B8D3]">{feature}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      </FormItem>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-[#FF3D00]" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="relative pt-6">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
                        <div className="flex items-center justify-end gap-3 pt-6">
                          <Button
                            variant="outline"
                            onClick={() => router.push("/stores")}
                            disabled={loading}
                            type="button"
                            className="border-[#FF00E5]/30 text-[#FF00E5] hover:bg-[#FF00E5]/10 hover:text-[#FF00E5] cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-[#FF3D00] to-[#FF00E5] hover:opacity-90 text-white border-0 shadow-[0_0_15px_rgba(255,61,0,0.3)] cursor-pointer"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              "Create Store"
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreModal
