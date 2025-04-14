import prismadb from "@/lib/db/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Razorpay from 'razorpay';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

const razorpayPlans: Record<string, string> = {
    starter: "plan_QIUoIRTZ8NEvBW",
    professional: "plan_QIUoiY2A4XbJGL",
    enterprise: "plan_QIUp1YL3B27B57",
}

export async function POST(req: Request) {

    try {

        const { userId } = await auth();
        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const body = await req.json();
        const {
            name,
            description,
            subscriptionPlan
        } = body;

        if (!name) return new NextResponse("Name is required", { status: 401 });
        if (!subscriptionPlan) return new NextResponse("SubscriptionPlan is required", { status: 401 });

        const razorpayPlanId = razorpayPlans[subscriptionPlan]
        if (!razorpayPlanId) {
            return new NextResponse("Invalid subscription plan", { status: 400 })
        }

        const slug = name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        const existingStore = await prismadb.store.findUnique({
            where: { slug },
        });

        if (existingStore) {
            return NextResponse.json(
                { error: "Store name already taken" },
                { status: 400 }
            );
        }

        const plan = await prismadb.plan.findUnique({
            where: { razorpayPlanId: razorpayPlanId },
        });

        if (!plan) {
            return NextResponse.json(
                { error: "Selected plan not found" },
                { status: 400 }
            );
        };

        const userEmail = "user333@example.com";
        const userName = "Store333 Owner";
        const userPhone = "1223667890";

        let razorpayCustomer;
        try {
            razorpayCustomer = await razorpay.customers.create({
                name: userName,
                email: userEmail,
                contact: userPhone,
                notes: {
                    userId: userId
                }
            });
        } catch (error) {
            console.error("Error creating Razorpay customer:", error);
            return NextResponse.json(
                { error: "Failed to create payment information" },
                { status: 500 }
            );
        }

        const now = new Date();
        const trialEnd = plan.trialDays > 0
            ? new Date(now.getTime() + plan.trialDays * 24 * 60 * 60 * 1000)
            : null;

        const currentPeriodEnd = new Date(
            now.getTime() + (plan.billingInterval === "month" ? 30 : 365) * 24 * 60 * 60 * 1000
        );

        const store = await prismadb.store.create({
            data: {
                userId: userId,
                name: name,
                slug: slug,
                isActive: true,
            }
        });

        await prismadb.storeSettings.create({
            data: {
                storeId: store.id,
            }
        });

        await prismadb.subscription.create({
            data: {
                storeId: store.id,
                planId: plan.id,
                status: plan.trialDays > 0 ? "trialing" : "active",
                currentPeriodStart: now,
                currentPeriodEnd,
                trialStart: plan.trialDays > 0 ? now : null,
                trialEnd,
                customerId: razorpayCustomer.id,
            }
        });

        await prismadb.staffMember.create({
            data: {
                storeId: store.id,
                email: userEmail,
                name: userName,
                role: "owner",
                permissions: JSON.stringify(["all"]),
            }
        });

        const razorpayOrder = await razorpay.orders.create({
            amount: plan.price * 100,
            currency: "INR",
            receipt: `store_${store.slug}`,
            notes: {
                storeId: store.id,
                planId: plan.razorpayPlanId,
                userId: userId
            }
        });

        return NextResponse.json({
            store,
            payment: {
                orderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
            }
        });

    } catch (error) {
        console.error("STORE_POST", error)
        return new NextResponse("Internal Error", { status: 500 });
    }

}