import React from 'react';
 import { useLocation} from 'react-router-dom';
import './Leftcomponent.css';

const Leftcomponent = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const names = params.get('name');
  const image_urls = params.get('image_url');
  const distances = params.get('distance');

  console.log('imagt4 u4l is ',image_urls)
  return(
    <div className='kdsfl'>
      <div className='title2'>{names}</div>
      <div className='photod'><img alt='img' className='photod' src='https://media.timeout.com/images/105454512/image.jpg'/></div>
      <div className='description'>{names}is a neighbourhood bakery who create all their own unique recipes from scratch, and are extremely passionate about working with sustainable ingredients and strive to work with local, independent and small scale suppliers where they can.</div>
      <div className='distance'>Ans this is just <span className='bold'>{(distances*69).toFixed(2)}</span> miles away </div>
    </div>
  );
};

export default Leftcomponent;
