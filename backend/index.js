const express = require('express');
const bodyParser = require('body-parser');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51J5EHJSEzMLO0wLKuzcB0cLS4gKs80nslkWNN4V4HjjF6twsxgTNxq4BBslOiVYnMuWIInhRRSkygTWrIrogyDU0000q3nsKNG');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello From ShoppingHub Backend!');
});


app.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount  , currency } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
         currency,
      });
      console.log(amount , currency)

      res.status(200).json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
      console.error('Error creating Payment Intent:', error.message);
      res.status(500).json({ error: 'Error creating Payment Intent : ' + error.message });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
