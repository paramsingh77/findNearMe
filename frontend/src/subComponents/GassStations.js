import React,{useState , useEffect, useCallback} from 'react'
import Modal from './Modal'; 
import './rest.css'


const GassStations = () => {
    const url = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/nearby-location/gasStation` : 'http://localhost:8080/api/nearby-location/gasStation';
    const [users, setUsers] = useState([]);
    const [, setUserLocation] = useState(null);
    const [loading,setLoading]  = useState(true);
    const [ulatitude , setUlatitude] = useState(null)
    const [ulongitude , setUlongitude] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const openModal = (user = null) => {
        setSelectedUser(user || users[0]);
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
      };
  
      const fetchData = useCallback(async (latitude,longitude) => {
        console.log('latitude:' , latitude , longitude);
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
          console.log(data);
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      }, [url]);
      // console.log('mylomh',ulatitude , ulongitude);
      // console.log('here sers',users[0]);
    
      const getUserLocation = useCallback(() => {
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
              console.error('This browser doesnt support');
              setLoading(false)
          }
      }, [fetchData]);
    
      useEffect(() => {
        getUserLocation();
      }, [getUserLocation]); 


  if (loading) {
    return (
      <div>
        <p className='pp'>Gas Stations you may like and near you</p>
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
      <p className='pp'>Gas Stations you may like to visit</p>
      <div className='class-parent-flex'>
        {users.length > 0 && users[0] && (
          <div className='flex1' onClick={openModal}>
            <div className='img'>
              <img className='img' alt="mmage" src={users[0].image_url} />
              <p className='pi'>{users[0].name}</p>
              <p className='pi1'>Station of the Day</p>
            </div>
          </div>
        )}
        {users.length > 1 && (
          <ul className='flex2-container'>
            {users.slice(1, 10).map((user, index) => (
              <li key={index}>
                <div className='flex-2' onClick={() => openModal(user)} style={{ cursor: 'pointer' }}>
                  <img className='imgd' alt='nmi' src={user.image_url} />
                  <p className='hotel_name'>{user.name}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div id="map"></div>
      {selectedUser && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          name={selectedUser.name} 
          image={selectedUser.image_url} 
          address={selectedUser.address} 
          website={selectedUser.website} 
          userLat={ulatitude} 
          userLng={ulongitude} 
          latitude={selectedUser.latitude} 
          longitude={selectedUser.longitude} 
          distance={selectedUser.distance} 
          users={users} 
        />
      )}
    </div>
  )
}

export default GassStations
