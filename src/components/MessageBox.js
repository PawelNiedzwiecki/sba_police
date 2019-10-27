import React, { useState, useEffect } from 'react';

const MessageBox = (props) => {

    const [message, setMessage] = useState(),
          [messageType, setMessageType] = useState(),
          messageClass = 'alert alert-'+messageType;
  
    useEffect(() => {
      setMessage(props.message);
      setMessageType(props.messageType);
    },[props])
    
  
    if(message){
      return(
        <div class={messageClass} role="alert">
          {message}
        </div>
      )
    }else{
      return null;
    }
  
  }

export default MessageBox;