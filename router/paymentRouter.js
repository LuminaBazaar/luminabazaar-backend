const router = require("express").Router();
const authorize = require("../middleware/authorize");
const stripe = require("stripe")(
    "sk_test_51NNh3PJAmdT1Qsrk1WtnkPzN1HmPfk1NMotKehKjaRaioNRjWBuiEmizDKv7fbHAudI2wwvM4m85lDhOSOudigB200vuOihj5k"
);

router.post("/create-checkout-session", authorize, async (req, res) => {
    const customer = await stripe.customers.create({
        metadata: {
            userId: req.user.id,
        },
    });

    const line_items = req.body.orderItems.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.product.name,
                    metadata: {
                        id: item.product._id,
                    },
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        };
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer: customer.id,
        success_url: `http://localhost:3000/#/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/#/cart`,
    });
    // res.redirect(303, session.url);
    res.send({ url: session.url });
});

module.exports = router;
