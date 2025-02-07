require('dotenv').config();
const env = require('dotenv').config({path: '../.env'});
const bcrypt = require('bcryptjs');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter"); 
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const User = require('./models/userModel');
// import { disableReactDevtools } from '@fvilers/disable-react-devtools'

// if(process.env.NODE_ENV === 'production') disableReactDevtools();



const path = require("path");

const adminRouter = require('./routes/adminRouter');

const db = require('./db');
db();
const app = express();
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const Order = require('./models/orderModel');

var corsOptions = {
    origin: "https://food-order-backend-we3d.onrender.com/"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));


const calculateOrderAmount = (orderItems) => {
    const initialValue = 0;
    const itemsPrice = orderItems.reduce(
        (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.amount, initialValue
    );
    return itemsPrice * 100;
}

app.use("/api", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use('/api/', productRouter);
app.use('/api/', userRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/admin", adminRouter);

// const generateAdminPassword = async () => {
//   const password = '';  
//   const hashedPassword = await bcrypt.hash(password, 10);  
//   console.log(hashedPassword);
// };

// generateAdminPassword();  


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Food Ordering"});
});

app.use(express.static(path.join(__dirname, 'build')));


app.get('/api/healthcheck', (req, res) => {
    res.json({
        msg: 'up'
    })
})


const { MongoClient, ServerApiVersion } = require('mongodb');

// Use the MongoDB URI from the .env file
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});















































// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// app.post('/create-payment-intent', async(req, res) => {
//   try {
//       const { orderItems, shippingAddress, userId } = req.body;

//       // Validate that each orderItem has a product ID
//       if (!orderItems || !orderItems.every(item => item.product)) {
//           return res.status(400).json({
//               error: {
//                   message: "Each order item must include a product ID."
//               }
//           });
//       }

//       const totalPrice = calculateOrderAmount(orderItems);
//       const taxPrice = 0; 
//       const shippingPrice = 0; 

//       const order = new Order({
//           orderItems,
//           shippingAddress,
//           paymentMethod: 'stripe',
//           totalPrice,
//           taxPrice,
//           shippingPrice,
//           user: userId
//       });

//       await order.save();

//       // Create payment intent with Stripe
//       const paymentIntent = await stripe.paymentIntents.create({
//           amount: totalPrice,
//           currency: 'usd'
//       });

//       res.send({
//           clientSecret: paymentIntent.client_secret
//       });
//   } catch(e) {
//       console.error("Error in /create-payment-intent:", e);
//       res.status(400).json({
//           error: {
//               message: e.message
//           }
//       });
//   }
// });


// app.use(
//   express.json({
//     // We need the raw body to verify webhook signatures.
//     // Let's compute it only when hitting the Stripe webhook endpoint.
//     verify: function (req, res, buf) {
//       if (req.originalUrl.startsWith('/webhook')) {
//         req.rawBody = buf.toString();
//       }
//     },
//   })
// );

// // Expose a endpoint as a webhook handler for asynchronous events.
// // Configure your webhook in the stripe developer dashboard
// // https://dashboard.stripe.com/test/webhooks
// app.post('/webhook', async (req, res) => {
//     let data, eventType;
  
//     // Check if webhook signing is configured.
//     if (process.env.STRIPE_WEBHOOK_SECRET) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let event;
//       let signature = req.headers['stripe-signature'];
//       try {
//         event = stripe.webhooks.constructEvent(
//           req.rawBody,
//           signature,
//           process.env.STRIPE_WEBHOOK_SECRET
//         );
//       } catch (err) {
//         console.log(`⚠️  Webhook signature verification failed.`);
//         return res.sendStatus(400);
//       }
//       data = event.data;
//       eventType = event.type;
//     } else {
//       // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//       // we can retrieve the event data directly from the request body.
//       data = req.body.data;
//       eventType = req.body.type;
//     }
  
//     if (eventType === 'payment_intent.succeeded') {
//       // Funds have been captured
//       // Fulfill any orders, e-mail receipts, etc
//       // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
//       console.log('💰 Payment captured!');
//     } else if (eventType === 'payment_intent.payment_failed') {
//       console.log('❌ Payment failed.');
//     }
//     res.sendStatus(200);
//   });

// // db.on('error', console.error.bind(console, 'MongoDB connection error:'))
