const express = require("express");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51JoFN9BABNlqbpwmra1oWY3LFD2HFcA0WxPtf9zv2ntrhyOhTuPAsVjMNw9qnfTHu7d9eLsq1T0JwHURlI1tK7vV00UAYgicXo");

const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/checkout", async (req, res) => {
  
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Pago Servicio psicologo",
      payment_method: id,
      confirm: true, 
    });

    console.log(payment);

    return res.status(200).json({ message: "Successful Payment" });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.listen(3001, () => {
  console.log("Server on port", 3001);
});