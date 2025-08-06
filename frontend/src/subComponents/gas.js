import React, { useState, useEffect } from 'react'
import Modal from './Modal'; 
import { Link } from 'react-router-dom';
import './rest.css'

const GasStation = ({ nearbyLocations }) => {
    const url = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/nearby-location/gasStation` : 'http://localhost:8080/api/nearby-location/gasStation';
    const [users, setUsers] = useState([]);
    const [, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ulatitude, setUlatitude] = useState(null)
    const [ulongitude, setUlongitude] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    const fetchData = async (latitude, longitude) => {
      setUlatitude(latitude)
      setUlongitude(longitude)

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude,
            longitude,
            category: 'gasStation',
          }),
        });
        console.log('Response Status:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error Data:', errorData);
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
      
        const data = await response.json();
        setUsers(data); 
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };
  
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    fetchData(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoading(false)
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false)
        }
    };
  
    useEffect(() => {
      getUserLocation();
    }, []); 

    if (loading) {
      return (
        <div>
          <p className='pp'>Gas Stations Near You</p>
          <div className='class-parent-flex'>
            <div className='flex1'>
              <div className='img'>
                <div className='img skeleton' src='http://via.placeholder.com/600x600' alt='skeleton Image'/>
                <p className='pi'></p>
                <p className='ppi'></p>
              </div>
            </div>
            <div>
              <ul className='flex2-container'>
                {Array.from({ length: 9 }).map((_, index) => (
                  <li key={index}>
                    <div className='flex-2'>
                      <div className='imgd skeleton'></div>
                      <p className='hotel_name'>
                        <div className='skeleton skeleton-text'></div>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>      
            </div>
          </div>
        </div>
      );
    }

    if (users.length === 0) {
      return <p>No gas stations found near you.</p>;
    }

    return (
      <div>
        <p className='pp'>Gas Stations Near You</p>
        <div className='class-parent-flex'>
          {users.length > 0 && users[0] && (
            <div className='flex1' onClick={openModal}>
              <div className='img'>
                <img className='img' alt='name' src={users[0].image_url} />
                <p className='pi'>{users[0].name}</p>
                <p className='pi1'>Station of the Day</p>
              </div>
            </div>
          )}
          {users.length > 1 && (
            <ul className='flex2-container'>
              {users.slice(1,10).map((user,index) => (
                <li key={index}>
                  <Link style={{color:'black' , textDecoration:'none'}} to={`/Leftcomponent?name=${user.name}&image_url=${user.image_url}&distance=${user.distance}`}>
                    <div className='flex-2'>
                      <img className='imgd' alt='imgds' src={user.image_url}></img>
                      <p className='hotel_name'>{user.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div id="map"></div>
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          name={users[0]?.name} 
          image={users[0]?.image_url} 
          address={users[0]?.address} 
          website={users[0]?.website} 
          userLat={ulatitude} 
          userLng={ulongitude} 
          latitude={users[0]?.latitude} 
          distance={users[0]?.distance} 
          longitude={users[0]?.longitude} 
          users={users} 
        />
      </div>
    );
}

export default GasStation;
