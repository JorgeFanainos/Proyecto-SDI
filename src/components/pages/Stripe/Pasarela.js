import React from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";
import { Pagoexitoso, PagoMal, PagoCancelado } from "../Icon";

const Pasarela = ({ order }) => {
  const paypalConf = {
    currency: "USD",
    env: "sandbox",
    client: {
      sandbox:
        "AYzvDF3dAHirlR1fNpr58mqVlLZYXLApfdth1tKg6OIH_gn58d5YtHpNRTM_xZutXD1n2zpvXVqpx2Hv",
      production: "--id--",
    },
    style: {
      lable: "pay",
      size: "medium",
      shape: "pill",
      color: "gold",
    },
  };
  const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });
  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: "20",
            currency: paypalConf.currency,
          },
          description: "Pago de cita!",
        },
      ],
    };
    return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
      .execute()
      .then((response) => {
        console.log(response);

        Pagoexitoso();
      })
      .catch((error) => {
        console.log(error);
        PagoMal();
      });
  };
  const onError = (error) => {
    console.log(error);
    PagoMal();
  };
  const onCancel = (data, actions) => {
    PagoCancelado();
  };
  return (
    <PayPalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onAuthorize={(data, actions) => onAuthorize(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={(error) => onError(error)}
      style={paypalConf.style}
      commit
      locale="es_MX"
    />
  );
};
export default Pasarela;
