import React, { useEffect } from 'react';
import './ViewHost.css'
const ViewHost = () => {
  const subdomain = window.location.host.split('.')[0];
  console.log(subdomain)
  // useEffect(() => {
  //     getHost(subdomain)
  //         .then(res => {
  //             console.log(res)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })
  // }, [])
  return (
    <div>
      <iframe className='full'
        src={`http://localhost:3001/host/allfiles/${subdomain}/index.html`}
      ></iframe>
    </div>
  );
};

export default ViewHost;
