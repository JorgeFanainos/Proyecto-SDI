import React from "react";
import "../../App";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";
import SeccionEspecialistasInicio from "../pages/BuscarPsicologos/PsicoCards";
import Cards from "../Cards/Cards";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="cards">
        <h1>Conoce a nuestros Psicólogos!</h1>
        <p>Buscamos a los mejores psicólogos para ayudarte! </p>
      </div>
      <SeccionEspecialistasInicio />
      <Footer />
    </>
  );
}

export default Home;
