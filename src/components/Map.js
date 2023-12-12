import React from 'react'
import './Map.css'
import { MapContainer , TileLayer , Marker , Popup } from 'react-leaflet'


const Map = ({...props}) => {

  return (
    <div className='mapStyle'>
        {console.log(' in moodything' , props.locationLat,props.locationLng , props.userLat , props.userLng)}
      <MapContainer  className='rel' zoom={8} center={[props.userLat , props.userLng]}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
      {console.log("rest location" , props.locationLat , props.locationLng)}
      <Marker position={[props.locationLat , props.locationLng]}>
        <Popup>{props.name}</Popup>
      </Marker> 
      <Marker position={[props.userLat , props.userLng]}>
        <Popup>Home</Popup>
      </Marker> 
      </MapContainer>
    </div>
  )
}

export default Map

