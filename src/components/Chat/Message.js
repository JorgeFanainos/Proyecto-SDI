import React from "react";
 import { formatRelative } from 'date-fns'

 const Message = ({
     createdAT= null,
     text='',
     displayName='',
     photoURL='',
 })=> {
     return<div> 
         {createdAT?.seconds ?(
             <span>
                 {formatRelative(new Date(createdAT.seconds * 1000), new Date()
                 )}
             </span>
         ): null}
         <p>{text}</p>
         
     </div>;
 };
 export default Message;