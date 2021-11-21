import  Message  from "./Message";
import { add } from "date-fns";
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useFirestoreQuery } from './Hooks';

const Channel = ({ user = null }) => {
    const db = firebase.firestore();
    const messagesRef = db.collection('messages');
    const messages = useFirestoreQuery(
      messagesRef.orderBy('createdAT', 'desc').limit(100)
    );
  
    const [newMessage, setNewMessage] = useState('');
  
    const inputRef = useRef();
    const bottomListRef = useRef();
  
    const { uid, displayName, photoURL } = user;
  
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef]);
  
    const handleOnChange = e => {
      setNewMessage(e.target.value);
    };
  
    const handleOnSubmit = e => {
      e.preventDefault();
  
      const trimmedMessage = newMessage.trim();
      if (trimmedMessage) {
      
        messagesRef.add({
          text: trimmedMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        
        setNewMessage('');
        
        bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div >
        <div >
          <div >
            <ul>
              {messages
                ?.sort((first, second) =>
                  first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                )
                ?.map(message => (
                  <li key={message.id}>
                    <Message {...message} />
                  </li>
                ))}
            </ul>
            <div ref={bottomListRef} />
          </div>
        </div>
        <div >
          <form
            onSubmit={handleOnSubmit}
            
          >
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="|"
              
            />
            <button
              type="submit"
              disabled={!newMessage}
              
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  
  export default Channel;