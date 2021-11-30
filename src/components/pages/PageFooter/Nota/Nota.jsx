
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../../../utils/firebaseApp";
import FormaDeNota from "../FormaDeNota/FormaDeNota";
import "./Nota.css"


const Nota = ({ user = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const db = firebase.firestore();
    const query = db.collection('notes').limit(100);
    useEffect(() => {
        // Subscribe to query with onSnapshot
        const unsubscribe = query.onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
              }));
        setMessages(data);
        });
      
        // Detach listener
        return unsubscribe;
      }, []);
    const handleOnChange = e => {
        setNewMessage(e.target.value)
    };
    const handleOnSubmit = e => {
        e.preventDefault();
      
        
        if (db) {
          
        db.collection('notes').add({
            text: newMessage,
          });
          
          setNewMessage('');
        }
      };
    return (
    <>
      
	  <p className="textotestimo"> Testimonios</p>
	  <div className="contenedorTesti">
      <form
        className="formTestimonios"
        onSubmit={handleOnSubmit}>
        <input
        className="input-texto"
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Escriba su testimonio"
        />
        <button
          className="boton_feed"
          type="submit"
          disabled={!newMessage}
        >
          Enviar
        </button>
      </form></div>
	  <ul className="Testimonio">
        {messages.map(message => (
          <li key={message.id}><FormaDeNota {...message}/></li>
        ))}
      </ul>
    </>
        
    );
};
export default Nota;