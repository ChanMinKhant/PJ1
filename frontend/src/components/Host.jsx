import React from 'react';

const Host = (props) => {
  return (
    <tr className='tableRow'>
      <td>
        <a href={`http://${props.domain}.${window.location.host}`}>
          `http://${props.domain}.${window.location.host}`
        </a>
      </td>
    </tr>
  );
};

export default Host;
