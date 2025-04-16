import Razorpay from "razorpay";

let razorpay_client: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
    if (!razorpay_client) {
        razorpay_client = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        })
    }
    return razorpay_client
}