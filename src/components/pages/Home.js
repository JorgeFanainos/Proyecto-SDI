import React from "react";
import "../../App";
import Cards from "../Cards/Cards";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";
import CartasPsicologo from "../pages/BuscarPsicologos/PsicoCards";

function Home() {
  return (
    <>
      <HeroSection />
      <CartasPsicologo />
      <Footer />
    </>
  );
}

export default Home;
