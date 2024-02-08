import React, { useRef } from 'react';

const FileCompo = (props) => {
  console.log(props);
  const textToCopyRef = useRef(null);

  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(textToCopyRef.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    // Deselect the text
    selection.removeAllRanges();
  };

  return (
    <div>
      <ul>
        <li>{props.originalFilename}</li>
        {/* <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li> */}
      </ul>
    </div>
    // <tr>
    //   <td>
    //     <a
    //       href={props.url}
    //       target='_blank'
    //       rel='noopener noreferrer'
    //       ref={textToCopyRef}
    //       style={{ marginRight: '10px' }}
    //     >
    //       {`${window.location.origin}/url/${props.shortUrl}`}
    //     </a>
    //   </td>
    //   <td>{props.clickCount}</td>
    //   <td>{props.isActive ? 'true' : 'false'}</td>
    //   <td>{props.limit}</td>
    //   <td>{props.shortUrl}</td>
    //   <td></td>
    //   <td>{props.url}</td>

    //   <td>
    //     <button onClick={handleCopyClick}>Copy</button>
    //   </td>
    // </tr>
  );
};

export default FileCompo;
