import React from 'react';
import  { useRef,useState} from 'react';


const Host = (props) => {
  const textToCopy = useRef(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  

  const handleCopy = () => {
    const range = document.createRange();
    range.selectNode(textToCopy.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    // Deselect the text
    selection.removeAllRanges();

    // Show "Copied!" message for 2 seconds
    setShowCopiedMessage(true);
    setTimeout(() => {
      setShowCopiedMessage(false);
    }, 2000);}
  return (
    // <tr>
   
      <tr>
        <td>
        
      <a 
      target='_blank'
      rel='noopener noreferrer'
      ref={textToCopy}
      style={{ marginRight: '10px', cursor: 'pointer' }}
      href={`http://${props.domain}.${window.location.host}`}>
        {`http://${props.domain}.${window.location.host}`}
      </a>
      </td>
      <td>
        <div>
        {showCopiedMessage ? (
            <span className='copied-message'>Copied!</span>):
        (<button onClick={handleCopy}>Copy</button>)
  }
        </div>
      </td>
      </tr>
        
   
    
  );
};

export default Host;
