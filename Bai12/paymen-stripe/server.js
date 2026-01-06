require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.post('/stripe-webhook', express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    const wenhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, wenhookSecret);
    } catch (error) {
        console.log(`webhook sifnatrue verification falid : ${error.message}`)
        return res.sendStatus(400);
    }

    switch (event.type) {
        case 'payment_intent.succeedes':
            const paymentIntentSucceeded = event.data.object;
            console.log("paymentIntentSucceeded : " , paymentIntentSucceeded)
            break ;
        case 'payment_intent.payment_failed' :
            const paymentIntentFailed = event.data.object;
            console.log("paymentIntentFailed : " , paymentIntentFailed)
            break ;
        default :
        console.log(`unhandled event type ${event.type}`)
    }
    res.json({received : true});
})



app.use(express.json());
app.use(express.static('public'));

app.post('/create-payment-intent', async (req, res) => {
    const { items, currency } = req.body;

    const calculateOrderAmount = (items) => {
        return 1099; // 1099 cents
    };
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: currency || 'usd',
            automatic_payment_methods: {
                enabled: true,
            },

        })
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        console.error("error create payment intent : ", error);
        res.status(500).send({ message: "error create payment intent" })
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to the Stripe demo");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
