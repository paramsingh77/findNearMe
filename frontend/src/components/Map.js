import React from 'react'
import './Map.css'
import { MapContainer , TileLayer , Marker , Popup } from 'react-leaflet'


const Map = ({...props}) => {
  // Provide default values to prevent undefined errors
  const locationLat = props.locationLat || 40.7128;
  const locationLng = props.locationLng || -74.0060;
  const userLat = props.userLat || 40.7128;
  const userLng = props.userLng || -74.0060;
  const name = props.name || 'Location';

  // Don't render map if coordinates are still undefined
  if (!locationLat || !locationLng || !userLat || !userLng) {
    return (
      <div className='mapStyle'>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='mapStyle'>
        {console.log(' in moodything' , locationLat, locationLng, userLat, userLng)}
      <MapContainer  className='rel' zoom={8} center={[userLat, userLng]}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
      {console.log("rest location" , locationLat, locationLng)}
      <Marker position={[locationLat, locationLng]}>
        <Popup>{name}</Popup>
      </Marker> 
      <Marker position={[userLat, userLng]}>
        <Popup>Home</Popup>
      </Marker> 
      </MapContainer>
    </div>
  )
}

export default Map

