import React from "react";
import "../../App";
import Cards from "../Cards/Cards";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
