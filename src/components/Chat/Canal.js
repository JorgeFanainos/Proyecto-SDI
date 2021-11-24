import  Message  from "./Message";
import { add } from "date-fns";
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../utils/firebaseApp";
import "./Chat.css";

const Channel = ({ user = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const db = firebase.firestore();
    const query = db.collection('messages').orderBy('createdAt').limit(100);
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
          
        db.collection('messages').add({
            text: newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          
          setNewMessage('');
        }
      };
    return (
    <>
      <ul>
        {messages.map(message => (
          <li key={message.id}><Message {...message}/></li>
        ))}
      </ul>
      <form
        className="formchat"
        onSubmit={handleOnSubmit}>
        <input
        className="input-texto"
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="|"
        />
        <button
          className="enviar"
          type="submit"
          disabled={!newMessage}
        >
          Enviar
        </button>
      </form>
    </>
        
    );
};
  
    
  
 
  

  
  export default Channel;