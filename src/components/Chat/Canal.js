import  Message  from "./Message";
import { add } from "date-fns";
import firebase from "firebase/compat";
import { QuerySnapshot } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { useFirestoreQuery } from './Hooks';
import { db } from "../../utils/firebaseApp";

const Channel = ({ user = null }) => {
    const [newMessage, setNewMessage] = useState([]);
    useEffect(()=>{
        if (db) {
            
        }
    })
    );
  
    
  
 
  

  
  export default Channel;