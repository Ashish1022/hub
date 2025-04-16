import { getRazorpayClient } from "../razorpay/razorpay-client";
import crypto from "crypto";

export class RazorpayService {
    static async createPlan(name: string, description: string, amount: number, interval = "monthly") {
        try {

            const razorpay = getRazorpayClient();

            const plan = razorpay.plans.create({
                period: "monthly",
                interval: 1,
                item: {
                    name,
                    description,
                    amount: amount * 100,
                    currency: "INR",
                },
            });

            return plan

        } catch (error) {
            console.error("Error creating Razorpay plan:", error)
        }
    }

    static async cancelSubscription(subscriptionId: string, cancelAtCycleEnd = false) {
        try {
          const razorpay = getRazorpayClient()
    
          const subscription = razorpay.subscriptions.cancel(subscriptionId, cancelAtCycleEnd)
    
          return subscription
        } catch (error) {
          console.error("Error canceling Razorpay subscription:", error)
          throw error
        }
      }

    static async createSubscription(plan_id: string, customerId: string, options: any = {}) {
        try {

            const razorpay = getRazorpayClient();

            const subscription = razorpay.subscriptions.create({
                plan_id: plan_id,
                total_count: options.totalCount || 12,
                quantity: options.quantity || 1,
                start_at: options.startAt || Math.floor(Date.now() / 1000),
                customer_notify: options.customerNotify ?? 1,
            });

            return subscription

        } catch (error) {
            console.error("Error creating Razorpay subscription:", error)
        }
    }

    static async createCustomer(name: string, email: string, phone?: string) {
        try {

            const razorpay = getRazorpayClient()

            const customer = await razorpay.customers.create({
                name,
                email,
                contact: phone,
            })

            return customer

        } catch (error) {
            console.error("Error creating Razorpay customer:", error)
            throw error
        }
    }

    static verifyPaymentSignature(paymentId: string, subscriptionId: string, signature: string) {
        try {

            const generatedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
                .update(`${paymentId}|${subscriptionId}`)
                .digest("hex")

            return generatedSignature === signature

        } catch (error) {
            console.error("Error verifying payment signature:", error)
            return false
        }
    }

    static async getSubscription(subscriptionId: string) {
        try {

            const razorpay = getRazorpayClient()

            const subscription = await razorpay.subscriptions.fetch(subscriptionId)

            return subscription

        } catch (error) {
            console.error("Error fetching Razorpay subscription:", error)
            throw error
        }
    }

    static async updateSubscription(subscriptionId: string, plan_id: string) {
        try {

            const razorpay = getRazorpayClient()

            const subscription = await razorpay.subscriptions.update(subscriptionId, {
                plan_id: plan_id,
            })

            return subscription

        } catch (error) {
            console.error("Error updating Razorpay subscription:", error)
            throw error
        }
    }

}