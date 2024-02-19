import React, { useEffect, useState } from 'react';
import './ViewHost.css';
import NotFound from '../error/NotFound';
import Suspended from '../error/Suspended';
import { isValidHost } from '../../services/hostService';

const ViewHost = () => {
  const subdomain = window.location.host.split('.')[0];
  const [isValid, setIsValid] = useState(true); // Assuming initially it's valid
  const [isSuspended, setIsSuspended] = useState(false); // State to manage if the website is suspended

  useEffect(() => {
    const temp = async () => {
      try {
        const result = await isValidHost(subdomain);
        setIsValid(true);
        console.log(result);
        setIsSuspended(result.isActive);
      } catch (error) {
        console.log(error.response.data.message);
        setIsValid(false); // Set isValid to false if an error occurs
      }
    };
    temp();
  }, [subdomain]);

  return (
    <div>
      {isValid ? (
        isSuspended ? (
          <Suspended />
        ) : (
          <iframe
            className='full'
            src={`http://localhost:3001/host/allfiles/${subdomain}/index.html`}
          ></iframe>
        )
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ViewHost;
