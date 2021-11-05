import React, {useState}from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Pasarela.css";
import { Wave } from "./Icon";


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
    return(
    <form className="ContenedorTodo" onSubmit={handleSubmit}>
      <div className="contenedorPagos">
          <div className="inputspago">
            <label className="lablepagos">Correo Electronico</label>
            <input type="email" placeholder="JhonDoe@mail.com"
            variant="filled"
            required/>
          </div>
          <br/>
          <CardElement/>
          <br/>
          <div className="inputspago">
            <label className="lablepagos">Nombre en la tarjeta</label>
            <input type="text" placeholder="Jhon Doe"
            variant="filled"
            required/>
          </div>
          <button className="botonPago" disabled={!stripe} >
          {loading ? (
            <div >
              <span >Loading...</span>
            </div>
          ) : (
            "Pagar"
          )}
          </button>
      </div>
      <div className="contenedorPagos">
        <h1>Precio de la consulta</h1>
        <div>
          <h1 className="precio">20$</h1>
        </div>
        <div className="contenedorpoliticas">
            <small className="small">Powered By STRIPE</small>
            <a 
            className="politicasStripe"
            href='https://stripe.com/privacy'
            rel='noreferrer'
            target='_blank'>Privacy | Terms</a>
        </div>
      </div>
    </form>
    )
} 

function Pasarela(){
    return(
    <>
      <Elements stripe={stripePromise}>
          <CheckoutForm/>
          <Wave/>
      </Elements>
      
    </>
    );

}
export default Pasarela