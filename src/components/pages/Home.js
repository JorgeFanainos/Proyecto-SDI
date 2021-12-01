import React , {useState, useEffect}from "react";
import "../../App";
import HeroSection from "../Hero/HeroSection";
import Footer from "../Footer/Footer";
import SeccionEspecialistasInicio from "../pages/BuscarPsicologos/PsicoCards";
import Nota from "./PageFooter/Nota/Nota";
import FormaDeNota from "./PageFooter/FormaDeNota/FormaDeNota";
import { auth, db } from "../../utils/firebaseApp";
import './Home.css'


 

function Home() { 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const query = db.collection("notes").limit(100);
  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("notes").add({
        text: newMessage,
        username: auth.currentUser.displayName,
      });

      setNewMessage("");
    }
  };
  return (
    <>
      <HeroSection />
      <div className="cards">
        <h1>Conoce a nuestros Psicólogos!</h1>
        <p>Buscamos a los mejores psicólogos para ayudarte! </p>
      </div>
      <SeccionEspecialistasInicio />
      <div className="mensajestestimonioshome">
      <h1>Testimonios</h1>
      <ul className="Testimonio1">
        {messages.map((message) => (
          <li key={message.id}>
            <FormaDeNota {...message} />
          </li>
        ))}
      </ul>
      </div>
      <Footer />
    </>
  );
}

export default Home;
