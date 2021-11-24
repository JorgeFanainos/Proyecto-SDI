import  Message  from "./Message";
import { add } from "date-fns";
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useFirestoreQuery } from './Hooks';
import { db } from "../../utils/firebaseApp";

const Channel = ({ user = null }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const { uid, displayName, photoURL } = user;
    useEffect(() => {
        if (db) {
         const unsuscribe =  db
            .collection('messages')
            .orderBy('createdAT')
            .limit(150);
            .onSnapshot(querySnapshot => {
                // Get all documents from collection - with IDs
                const data = querySnapshot.docs.map(doc => ({
                  ...doc.data(),
                  id: doc.id,
                }));
              });
           return unsuscribe;
        }
    }, [db]);
    const handleOnChange = e => {
        setNewMessage(e.target.value)
    };
    const handleOnSumit = e => {
        e.preventDefault();
        if (db){
            db.collection('messages').add({
                text:newMessage,
                createdAT: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
    };
    return (
    <>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form
        onSubmit={handleOnSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          disabled={!newMessage}
        >
          Send
        </button>
      </form>
    </>
        
    );
};
  
    
  
 
  

  
  export default Channel;