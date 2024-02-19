import React, { useEffect } from 'react';
import './ViewHost.css';
import { isValidHost } from '../../services/hostService';
const ViewHost = () => {
  const subdomain = window.location.host.split('.')[0];
  console.log(subdomain);
  useEffect(() => {
    const temp = async () => {
      try {
        const data = await isValidHost(subdomain);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    temp();
  }, [subdomain]);
  return (
    <div>
      <iframe
        className='full'
        src={`http://localhost:3001/host/allfiles/${subdomain}/index.html`}
      ></iframe>
    </div>
  );
};

export default ViewHost;
