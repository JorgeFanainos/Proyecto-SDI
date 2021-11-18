import React from "react";
import "../../App";
import Cards from "../Cards/Cards";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";
import SeccionEspecialistasInicio from "../pages/BuscarPsicologos/PsicoCards";

function Home() {
  return (
    <>
      <HeroSection />
      <SeccionEspecialistasInicio />
      <Footer />
    </>
  );
}

export default Home;
