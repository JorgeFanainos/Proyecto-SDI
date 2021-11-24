import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/compat";
import Channel from "./Canal";
import { auth } from "../../utils/firebaseApp";

const db = firebase.firestore(); 

function Chat(){
    const [user, setUser]  = useState(()=> auth.currentUser);
    return(
        <Channel user={user} db = {db}/>
    )
}