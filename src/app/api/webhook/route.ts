import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

function verifyWebhookSignature(
    body: string,
    signature: string,
    secret: string
): boolean {
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(body)
        .digest("hex");

    return crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(signature, "hex")
    );
}

export async function POST(
    req: Request
) {

    try {

        const signature = req.headers.get('x-razorpay-signature') as string;
        const body = await req.json();

        if (!signature) return new NextResponse("Missing signature header.", { status: 400 });

        const isValid = verifyWebhookSignature(
            body,
            signature,
            secret
        );

        if (!isValid) return new NextResponse("Invalid webhook signature.", { status: 401 });

        const event = body.event;

        switch (event) {
            case "subscription.charged":
        }

    } catch (error) {

    }

}