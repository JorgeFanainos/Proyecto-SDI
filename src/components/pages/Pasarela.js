import React, {useState}from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const  stripePromise=loadStripe("pk_test_51JoFN9BABNlqbpwmwzuZ8jpi4kOJcKRShDKR5aqPsG5n3cJuCtzLJzDygVE49LIARvlciux4WG6CgHxKPgd2XMFL00XqWb04d8")
const CheckoutForm=()=>{   
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const handleSubmit= async (e)=>{
        e.preventDefault();  
        const {error, paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        });
        if (!error) {
            // console.log(paymentMethod)
            const { id } = paymentMethod;
            try {
              const { data } = await axios.post(
                "http://localhost:3001/api/checkout",
                {
                  id,
                  amount: 10000, //cents
                }
              );
              console.log(data);
      
              elements.getElement(CardElement).clear();
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
          }
        };
      
        console.log(!stripe || loading);
    return<form onSubmit={handleSubmit}>
        <CardElement/>
        <button disabled={!stripe} >
        {loading ? (
          <div >
            <span >Loading...</span>
          </div>
        ) : (
          "Pagar"
        )}
      </button>
    </form>
} 

function Pasarela(){
    return(
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
    );

}
export default Pasarela