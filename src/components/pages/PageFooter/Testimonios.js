import React, { useState } from "react";
import firebase from "firebase/compat";
import Nota from './Nota/Nota.jsx'
import { auth } from "../../../utils/firebaseApp";
import Sidebar from "../../pages/Perfiles/componentesperfiles/Sidebar";


const db = firebase.firestore(); 

function Testimonio(){
    const [user, setUser]  = useState(()=> auth.currentUser);
    return(
        <div className="Contenedor_todochat">
            <div className="contenedor_sidebar">
            <Sidebar/>
            </div>
            <div className="contenedor_canal">
            <Nota user={user} db = {db}/>
            </div>
        </div>
    )
}
export default Testimonio;