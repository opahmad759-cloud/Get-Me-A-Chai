import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if razorpayOrderId is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "Order Id not found" })
    }

    // fetch the secret of the user who is getting the payment 
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpaysecret

    // Verify the payment
    let xx = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, secret)

    if (xx) {
        // Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        // Return supporters to the creator page and mark the completed payment for its success toast.
        const redirectUrl = new URL(`/${encodeURIComponent(updatedPayment.to_user)}`, req.url)
        redirectUrl.searchParams.set("paymentdone", "true")
        return NextResponse.redirect(redirectUrl, 303)
    }

    else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" })
    }

}