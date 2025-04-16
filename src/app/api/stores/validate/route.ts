import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import prismadb from "@/lib/db/prismadb";
import { SubscriptionService } from "@/lib/services/subscription-service";

export async function POST(req: NextRequest) {
    try {

        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 500 });

        const body = await req.json()
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature, razorpay_plan_id, storeId } = body

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
            .digest("hex")

        if (generatedSignature !== razorpay_signature) return NextResponse.json({ error: "Invalid signature" }, { status: 400 })

        const plan = await prismadb.plan.findFirst({
            where: {
                razorpayPlanId: razorpay_plan_id,
            },
        });

        if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

        await SubscriptionService.createSubscription(storeId, plan.id)

        await prismadb.store.update({
            where: { id: storeId },
            data: {
                isActive: true,
            },
        })

        return NextResponse.json({ msg: "success" })

    } catch (error) {
        console.error("Error validating payment:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}