// import prismadb from "@/lib/db/prismadb";
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// })

// export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();
//         const {
//             razorpay_payment_id,
//             razorpay_order_id,
//             razorpay_signature,
//             storeId,
//             planId
//         } = body;
//         const generatedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//             .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//             .digest("hex");
//         if (generatedSignature !== razorpay_signature) {
//             return NextResponse.json(
//                 { error: "Invalid payment signature" },
//                 { status: 400 }
//             );
//         }
//         const payment = await razorpay.payments.fetch(razorpay_payment_id);
//         const subscription = await prismadb.subscription.findFirst({
//             where: { storeId },
//             include: { plan: true }
//         });
//         if (!subscription) {
//             return NextResponse.json(
//                 { error: "Subscription not found" },
//                 { status: 404 }
//             );
//         }
//         let razorpaySubscription;
//         const plan = await prisma.plan.findUnique({ where: { id: planId } });
//         const razorpayPlanId = plan?.billingInterval === "month"
//             ? "plan_monthly_id_from_razorpay"
//             : "plan_yearly_id_from_razorpay";
//         try {
//             razorpaySubscription = await razorpay.subscriptions.create({
//                 plan_id: razorpayPlanId,
//                 customer_notify: 1,
//                 total_count: 12,
//                 customer_id: subscription.customerId,
//                 notes: {
//                     storeId: storeId,
//                     planId: planId
//                 }
//             });
//         } catch (error) {
//             console.error("Failed to create Razorpay subscription:", error);
//         }
//         await prismadb.subscription.update({
//             where: { id: subscription.id },
//             data: {
//                 status: "active",
//                 subscriptionId: razorpaySubscription?.id || null,
//             }
//         });
//         await prismadb.invoice.create({
//             data: {
//                 subscriptionId: subscription.id,
//                 invoiceNumber: `INV-${Date.now()}`,
//                 amount: payment.amount.toString(), 
//                 status: "paid",
//                 currency: payment.currency || "INR",
//                 invoiceDate: new Date(),
//                 dueDate: new Date(),
//                 paidDate: new Date(),
//                 billingAddress: JSON.stringify({}), // You would get this from the user during checkout
//                 paymentMethod: "razorpay",
//                 paymentProviderId: razorpay_payment_id,
//             }
//         });

//         // Update store status to active
//         await prismadb.store.update({
//             where: { id: storeId },
//             data: { isActive: true }
//         });

//         return NextResponse.json({
//             success: true,
//             message: "Payment verified and subscription activated"
//         });
//     } catch (error) {
//         console.error("[PAYMENT_VERIFY]", error);
//         return NextResponse.json(
//             { error: "Internal server error" },
//             { status: 500 }
//         );
//     }
// }