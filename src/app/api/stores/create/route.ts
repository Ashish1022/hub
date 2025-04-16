import prismadb from "@/lib/db/prismadb";
import { getRazorpayClient } from "@/lib/razorpay/razorpay-client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const razorpayPlan: Record<string, string> = {
    starter: "plan_QIUoIRTZ8NEvBW",
    professional: "plan_QIUoiY2A4XbJGL",
    free: "plan_free"
}

export async function POST(req: NextRequest) {

    try {

        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json()
        const { name, description, subscriptionPlan } = body

        if (!name || !subscriptionPlan) return new NextResponse("Name and Subscription plan is required", { status: 400 });

        let razorpay_plan_id = razorpayPlan[subscriptionPlan]

        const plan = await prismadb.plan.findFirst({
            where: {
                razorpayPlanId: razorpay_plan_id,
                isActive: true,
            },
        })

        if (!plan) return NextResponse.json({ error: "Invalid subscription plan" }, { status: 400 })

        const store = await prismadb.store.create({
            data: {
                name: name,
                description: description ? description : "",
                userId: userId,
                storageUsed: 0,
                isActive: false,
            }
        })

        const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        }).then((res) => res.json())

        const razorpay = getRazorpayClient()

        const razorpaySubscriptions = await razorpay.subscriptions.create({
            plan_id: plan.razorpayPlanId!,
            customer_notify: 1,
            total_count: 12,
        });

        return NextResponse.json({
            store,
            user: {
                user_id: userId,
                user_name: user.first_name + " " + user.last_name,
                user_email: user.email_addresses[0].email_address,
                user_phone: user.phone_numbers?.[0]?.phone_number || "",
            },
            razorpaySubscriptions,
        })

    } catch (error) {
        console.error("Error creating store:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}