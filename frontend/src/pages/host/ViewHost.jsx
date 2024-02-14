import React, { useEffect } from 'react';
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
      <h1>View Host</h1>
      <iframe
        src={`http://localhost:3001/host/allfiles/${subdomain}/index.html`}
      ></iframe>
    </div>
  );
};

export default ViewHost;
