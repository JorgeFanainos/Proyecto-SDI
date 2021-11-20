import React from "react";
import "../../App";
import Cards from "../Cards/Cards";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";
import CartasPsicologo from "../pages/BuscarPsicologos/PsicoCards";

function Home() {
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div>
        <CartasPsicologo />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
