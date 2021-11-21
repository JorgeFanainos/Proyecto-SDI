import React from "react";
import { formatRelative } from 'date-fns';
import PropTypes from 'prop-types';


const formatDate = date => {
    let formattedDate = '';
    if (date) {
      formattedDate = formatRelative(date, new Date());
      
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };
 const Message = ({
     createdAT= null,
     text='',
   
 })=> {
     return<div > 
         {createdAT?.seconds ?(
            <span>
             {formatDate(new Date(createdAT.seconds * 1000))}
           </span>
         ): null}
         <p>{text}</p>
         
     </div>;
 };
 Message.propTypes = {
    text: PropTypes.string,
    createdAt: PropTypes.shape({
      seconds: PropTypes.number,
    }),
  };
 export default Message;