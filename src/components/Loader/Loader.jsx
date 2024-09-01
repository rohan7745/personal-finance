import React from 'react';
import { dotPulse } from 'ldrs';
import './Loader.css';

const Loader = () => {
  dotPulse.register();

  return (
    <div className='loaderContainer'>
      <div className='loader'>
        <l-dot-pulse size="65" speed="1.3" color="#2970ff"></l-dot-pulse>
      </div>
    </div>
  );
};



export default Loader;
