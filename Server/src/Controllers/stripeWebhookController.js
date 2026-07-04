import stripe from "../Config/stripe.js";
import User from "../Models/userModel.js";

export const stripeWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature']
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: `Webhook Error: ${error}`
        });
    }

    if(event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const credits = session.metadata.credits;
        const plan = session.metadata.plan;

        await User.findByIdAndUpdate(userId, {
            $inc: {credits},
            plan
        });
    }

    return res.json({
        received: true
    });
};