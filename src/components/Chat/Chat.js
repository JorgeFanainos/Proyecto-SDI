import React, { useState } from "react";
import firebase from "firebase/compat";
import Channel from "./Canal";
import { auth } from "../../utils/firebaseApp";
import Sidebar from "../pages/Perfiles/componentesperfiles/Sidebar";
import "./Chat.css";

const db = firebase.firestore(); 

function Chat(){
    const [user, setUser]  = useState(()=> auth.currentUser);
    return(
        <div className="Contenedor_todochat">
            <div className="contenedor_sidebar">
            <Sidebar/>
            </div>
            <div className="contenedor_canal">
            <Channel user={user} db = {db}/>
            </div>
        </div>
    )
}
export default Chat;