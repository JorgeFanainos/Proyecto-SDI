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
      <Cards />
      <SeccionEspecialistasInicio />
      <Footer />
    </>
  );
}

export default Home;
