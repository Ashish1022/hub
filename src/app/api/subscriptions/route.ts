import { SubscriptionService } from "@/lib/services/subscription-service";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
) {

    try {

        const body = await req.json();
        const { store_id, plan_id } = body;

        if (!store_id) return NextResponse.json({ error: "Store ID is required" }, { status: 400 });

        const subscription = await SubscriptionService.createSubscription(store_id, plan_id);

    } catch (error) {
        console.error("Error creating subscription:", error)
        return NextResponse.json({ error: "Internal server error", message: (error as Error).message }, { status: 500 })
    }

}