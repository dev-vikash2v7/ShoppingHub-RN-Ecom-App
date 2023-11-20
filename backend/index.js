const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Stripe Backend!');
});


app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount  , currency , gateway} = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
      console.error('Error creating Payment Intent:', error);
      res.status(500).send({ error: 'Error creating Payment Intent' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
