import prismadb from "@/lib/db/prismadb";
import { SubscriptionService } from "@/lib/services/subscription-service";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { subscriptionId, cancelAtPeriodEnd = true } = body

        if (!subscriptionId) {
            return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 })
        }

        const subscription = await prismadb.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                store: true,
            },
        })

        if (!subscription) {
            return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
        }

        if (subscription.store.userId !== userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const canceledSubscription = await SubscriptionService.cancelSubscription(subscriptionId, cancelAtPeriodEnd)

        return NextResponse.json({ subscription: canceledSubscription })

    } catch (error) {
        console.error("Error canceling subscription:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }

}