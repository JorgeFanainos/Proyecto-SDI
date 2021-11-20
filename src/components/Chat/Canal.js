import  Message  from "./Message";
import { add } from "date-fns";
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";

const Canal = ({user = null, db = null}) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {uid , dislplayName, photoURL} = user;

    useEffect(() => {
    if (db){
       const unsuscribe = 
       db.collection('messages')
       .orderBy('createdAT')
       .limit(100)
       .onSnapshot(querySnapshot => {
           const data = querySnapshot.docs.map(doc => ({
               ...doc.data(),
               id: doc.id,
           }));
           setMessages(data);
       });
       return unsuscribe;
    }
    }, [db]);
    const handleOnChange = e =>{
        setNewMessage(e.target.value)
    };
    const handleOnSubmit = e =>{
        e.preventDefault();
        if (db){
            db.collection('messages').add({
            text: newMessage,
            createdAT: firebase.firestore.FieldValue.serverTimestamp(),
        })
    }
    };
    return (
        <>
        <ul>
            {messages.map(message=>(
                <li key={message.id}><Message {...message}/></li>
            ))}
        </ul>
        <form  onSubmit={handleOnSubmit}>
            <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="|"
            />
            <button type="submit" disabled={!newMessage}> Enviar</button>
        </form>
        
        </>
    )

};

export default Canal;