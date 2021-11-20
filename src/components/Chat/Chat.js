import Canal from "./Canal";
import firebase from "firebase/compat";


const  db =firebase.firestore();
const user =firebase.firestore();
function Chat() {
    return (
      <>
       <Canal user={user} db={db}/>
      </>
    );
  }
  
  export default Chat;