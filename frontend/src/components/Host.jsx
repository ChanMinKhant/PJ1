import React from 'react';

const Host = (props) => {
  return (
    // <tr className='tableRow'>
    <div>
      <a href={`http://${props.domain}.${window.location.host}`}>
        `http://${props.domain}.${window.location.host}`
      </a>
    </div>
    // </tr>
  );
};

export default Host;
