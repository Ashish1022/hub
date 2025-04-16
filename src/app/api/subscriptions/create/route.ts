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
        const { storeId, planId } = body

        if (!storeId || !planId) {
            return NextResponse.json({ error: "Store ID and Plan ID are required" }, { status: 400 })
        }

        const store = await prismadb.store.findUnique({
            where: { id: storeId, userId },
        })

        if (!store) {
            return NextResponse.json({ error: "Store not found" }, { status: 404 })
        }

        const plan = await prismadb.plan.findUnique({
            where: { id: planId },
        })

        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 404 })
        }

        const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        }).then((res) => res.json())

        let razorpayCustomerId = ""

        try {

            const existingSubscription = await prismadb.subscription.findFirst({
                where: {
                    store: {
                        userId,
                    },
                    razorpayCustomerId: {
                        not: null,
                    },
                },
                select: {
                    razorpayCustomerId: true,
                },
            })

            if (existingSubscription?.razorpayCustomerId) {
                razorpayCustomerId = existingSubscription.razorpayCustomerId
            } else {
                const customer = await RazorpayService.createCustomer(
                    `${user.first_name} ${user.last_name}`,
                    user.email_addresses[0].email_address,
                    user.phone_numbers?.[0]?.phone_number,
                )
                razorpayCustomerId = customer.id
            }

        } catch (error) {
            console.error("Error creating/getting Razorpay customer:", error)
            return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
        }

        const razorpaySubscription = await RazorpayService.createSubscription(plan.razorpayPlanId!, razorpayCustomerId, {
            totalCount: 12,
            customerNotify: 1,
        })

        return NextResponse.json({
            razorpaySubscription,
            plan,
            store,
            user: {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email_addresses[0].email_address,
                phone: user.phone_numbers?.[0]?.phone_number || "",
            },
        })

    } catch (error) {
        console.error("Error creating subscription:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}