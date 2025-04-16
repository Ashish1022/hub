import prismadb from "@/lib/db/prismadb";
import { RazorpayService } from "@/lib/services/razorpay-service";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, storeId, plan_id } = body

        if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature || !storeId || !plan_id) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const isValid = RazorpayService.verifyPaymentSignature(
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
        )

        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
        }

        const store = await prismadb.store.findUnique({
            where: { id: storeId, userId },
            include: {
                subscription: true,
            },
        })

        if (!store) {
            return NextResponse.json({ error: "Store not found" }, { status: 404 })
        }

        const plan = await prismadb.plan.findUnique({
            where: { id: plan_id },
        })

        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 404 })
        }

        const razorpaySubscription = await RazorpayService.getSubscription(razorpay_subscription_id)

        const currentPeriodEnd = new Date((razorpaySubscription.current_end ?? 0) * 1000)

        if (store.subscription) {
            await prismadb.subscription.update({
                where: { id: store.subscription.id },
                data: {
                    planId: plan_id,
                    status: "active",
                    currentPeriodStart: new Date((razorpaySubscription.current_end ?? 0) * 1000),
                    currentPeriodEnd,
                    razorpaySubscriptionId: razorpay_subscription_id,
                    razorpayCustomerId: razorpaySubscription.customer_id,
                    cancelAtPeriodEnd: false,
                    canceledAt: null,
                    customerId: userId,
                },
            })
        } else {
            await prismadb.subscription.create({
                data: {
                    storeId,
                    planId: plan_id,
                    status: "active",
                    currentPeriodStart: new Date((razorpaySubscription.current_end ?? 0) * 1000),
                    currentPeriodEnd,
                    razorpaySubscriptionId: razorpay_subscription_id,
                    razorpayCustomerId: razorpaySubscription.customer_id,
                    customerId: userId,
                },
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error verifying subscription:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}