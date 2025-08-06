import React, { useState } from 'react';
import Map from '../components/Map';
import './Modal.css'
import loci  from './marker.png'

const Modal = ({ isOpen, onClose  , ...props} ) => {
  const [imageLoading, setImageLoading] = useState({});
  
  if (!isOpen) return null;
  
  var users  = props.users
  console.log('Modal props:', {
    name: props.name,
    latitude: props.latitude,
    longitude: props.longitude,
    userLat: props.userLat,
    userLng: props.userLng
  });

  const handleImageLoad = (index) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const handleImageError = (index) => {
    setImageLoading(prev => ({ ...prev, [index]: false }));
  };

  const startImageLoading = (index) => {
    setImageLoading(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="modal">
    <div className="overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className='name-and-close'>
          <div className='rest-name'>{props.name}</div>
          <div className='cross' onClick={onClose}><button className='button'><p>x</p></button></div>
        </div>
        <div className='flex-for-info'>
            <div className="flex-for-name-title">
              Restaurant
              <div className='topmar'>
              <p className='paras'>The {props.name} is a cosy, neighbourhood pub in Lauriston Village doing incredible small & medium plate food, with delicious Sunday Roast options.</p>
              </div>
              {/* <div className='Address'><img className='imgs' src={loci} alt='imgds'></img>Address<br/>{props.address} </div> */}
            </div>
  
            <div className='flex-for-the-image'>
               <img className='class-of-image' alt='img' src={props.image}></img>
            </div>
        </div>
        <div className='flex displ'>
         {console.log('users distances : ',users.distance)}
        <div className='Address'><img className='imgs' src={loci} alt='imgds'></img>Address<br/>{props.address} </div>
        <div className='Address1'><img className='imgs' src={loci} alt='imgds'></img>Distance<br/>{(props.distance*69).toFixed(2)} Miles </div>
        </div>
        <div className='map-place'>
             <Map 
               name={props.name || 'Location'} 
               locationLat={props.latitude} 
               locationLng={props.longitude} 
               userLat={props.userLat} 
               userLng={props.userLng} 
             />
        </div>
     {/* <p className=''>address : {props.address}</p>
     <p className=''>website : {props.website}</p> */}
    <div className='suggestion-block' style={{color:'black'}}>
        Discover more places
      <div className='sugg'>
       {users.slice(10,40).map((user,index)=>( 
           <div className='cards' key={index}>
             <div className="card-image-container">
               <img 
                 alt='imgs' 
                 className={`imgss ${imageLoading[index] ? 'loading' : ''}`} 
                 src={user.image_url}
                 onLoad={() => handleImageLoad(index)}
                 onError={() => handleImageError(index)}
                 onLoadStart={() => startImageLoading(index)}
               />
               <div className="card-distance">
                 {(user.distance*69).toFixed(1)} mi
               </div>
               {user.rating && (
                 <div className="card-rating">
                   {user.rating}
                 </div>
               )}
             </div>
             <div className="card-content">
               <p className='cards-text'>{user.name}</p>
             </div>
           </div>
      
       ))}
      </div>
    </div>
    {/* <div className='empty'>

    </div> */}
 
   </div>
 </div>
  );
};

export default Modal;
