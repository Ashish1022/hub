import prismadb from "../db/prismadb";
import { RazorpayService } from "./razorpay-service";

export class SubscriptionService {
    static async createSubscription(storeId: string, plan_id?: string, razorpaySubscriptionId?: string) {
        try {

            const store = await prismadb.store.findUnique({
                where: { id: storeId },
                include: { subscription: true },
            });

            if (!store) throw new Error(`Store with ID ${storeId} not found`);

            if (store.subscription) throw new Error(`Store with ID ${storeId} already has a subscription`)

            let plan
            if (!plan_id) {
                plan = await prismadb.plan.findFirst({
                    where: {
                        price: 0,
                        isActive: true,
                    },
                })
            };

            if (!plan) {
                throw new Error("No free plan found")
            } else {
                plan = await prismadb.plan.findUnique({
                    where: { id: plan_id },
                });
                if (!plan) {
                    throw new Error(`Plan with ID ${plan_id} not found`)
                }
            }

            const subscription = await prismadb.subscription.create({
                data: {
                    storeId,
                    planId: plan.id,
                    status: "active",
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    customerId: store.userId, //TODO: In a real app, this would be a payment provider customer ID
                    razorpaySubscriptionId,
                },
            });

            return subscription

        } catch (error) {
            console.error("Error creating subscription:", error)
        }
    }

    static async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true) {

        try {

            const subscription = await prismadb.subscription.findUnique({
                where: { id: subscriptionId },
            })

            if (!subscription) {
                throw new Error(`Subscription with ID ${subscriptionId} not found`)
            }

            if (subscription.razorpaySubscriptionId) {
                await RazorpayService.cancelSubscription(subscription.razorpaySubscriptionId, cancelAtPeriodEnd)
            }

            const updatedSubscription = await prismadb.subscription.update({
                where: { id: subscriptionId },
                data: {
                    status: cancelAtPeriodEnd ? "active" : "canceled",
                    cancelAtPeriodEnd,
                    canceledAt: cancelAtPeriodEnd ? null : new Date(),
                },
            })

            return updatedSubscription

        } catch (error) {
            console.error("Error canceling subscription:", error)
        }

    }

    static async updateSubscriptionPlan(subscriptionId: string, plan_id: string) {
        try {

            const subscription = await prismadb.subscription.findUnique({
                where: { id: subscriptionId },
                include: {
                    plan: true,
                },
            });

            if (!subscription) {
                throw new Error(`Subscription with ID ${subscriptionId} not found`)
            }

            const plan = await prismadb.plan.findUnique({
                where: { id: plan_id },
            })

            if (!plan) {
                throw new Error(`Plan with ID ${plan_id} not found`)
            }

            if (subscription.razorpaySubscriptionId && plan.razorpayPlanId) {
                await RazorpayService.updateSubscription(subscription.razorpaySubscriptionId, plan.razorpayPlanId)
            }

            const endDate = new Date()
            endDate.setDate(endDate.getDate() + 30)

            const updatedSubscription = await prismadb.subscription.update({
                where: { id: subscriptionId },
                data: {
                    planId: plan_id,
                    currentPeriodStart: new Date(),
                    currentPeriodEnd: endDate,
                },
            })

            return updatedSubscription

        } catch (error) {
            console.error("Error updating subscription plan:", error)

        }
    }
}