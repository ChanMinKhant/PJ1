import React from 'react';
import  { useState, useEffect } from 'react';



const Host = (props) => {
  return (
    // <tr>
   
      <tr>
        <td>
      <a href={`http://${props.domain}.${window.location.host}`}>
        `http://${props.domain}.${window.location.host}`
      </a>
      </td>
      <td>
        <button >Edit</button>
      </td>
      </tr>
      
   
    
  );
};

export default Host;
