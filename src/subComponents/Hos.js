import React,{useState , useEffect} from 'react'
import Modal from './Modal'; 
import { Link } from 'react-router-dom';
import './rest.css'
const Rest = ({ nearbyLocations }) => {
    const url = 'http://localhost:8080/api/nearby-location/Hospital';
    const [users, setUsers] = useState([]);
    const [, setUserLocation] = useState(null);
    const [loading,setLoading]  = useState(true);
    const [ulatitude , setUlatitude] = useState(null)
    const [ulongitude , setUlongitude] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    const fetchData = async (latitude,longitude) => {
      // console.log('latitude:' , latitude , longitude);
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
            category: 'Hospital',
          }),
        });
        console.log('Response Status:', response.status); //

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error Data:', errorData);
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
      
        const data = await response.json();
        setUsers(data); 
        // console.log(data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };
    // console.log('mylomh',ulatitude , ulongitude);
    // console.log('here sers',users[0]);
  
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
    }); 

    // console.log(users[0].address);
  return (
    <div>
        {loading  ? (
          <>
           {/* <span class="loader"></span> */}
           <p className='pp'>Hospitals Near you</p>
           <div className='class-parent-flex'>
              <div className='flex1' >
              <div className='img'>
              <div className='img skeleton ' src='http://via.placeholder.com/600x600' alt='skeleton Image'/>
                <p className='pi'></p>
                <p className='ppi'></p>
              </div>
              </div>

         <div>
        
         <ul className='flex2-container'>
          
          {(()=>{
            const elements = [];
            for (let i = 0; i < 9; i++) {
              elements.push(
                  <li>
                    <div className='flex-2'>
                      <div className='imgd skeleton'></div>
                      {/* <img className='imgd skeleton' src='' alt='skeleton Image'/> */}
                      <p className='hotel_name'>
                        <div className='skeleton skeleton-text'></div>
                      </p>
                    </div>
                  </li>
              );
            }
            return elements;
          })()}

          </ul>      
         </div>
         </div>
              
           </>
        ):(
    <>
    <p className='pp'>Restaurants you may like and near you</p>
    <div className='class-parent-flex'>
      {users.length > 0 && users[0] && (
        <div className='flex1' onClick={openModal}>
        <div className='img'>
          <img className='img' alt='name' src={`${users[0].image_url}`} />
          <p className='pi'>{users[0].name}</p>
          <p className='pi1'>Place of the Day</p>
          </div>
        </div>
      )}
      {users.length > 1 && (
        <ul className='flex2-container'>
          {users.slice(1,10).map((user,index) => (
            <li key={index}>
               <Link style={{color:'black' , textDecoration:'none'}} to={`/Leftcomponent?name=${user.name}&image_url=${user.image_url}&distance=${user.distance}`}>
              <div className='flex-2'>
               <img className='imgd ' alt='imgds' src={`${user.image_url}`}></img>
               <p className='hotel_name'>{user.name}</p>
              </div>
              </Link>
            </li>
          ))}
         
        </ul>
      )}
    </div>
    <div id="map"></div>
    {/* {console.log('ulat',ulatitude , ulongitude)} */}
    {/* {console.log('rest location' , users[0].longitude ,  users[0].latitude , users[0].name)} */}
    <Modal isOpen={isModalOpen} onClose={closeModal} name={users[0].name} image = {users[0].image_url} address={users[0].address} website = {users[0].website} userLat = {ulatitude} userLng = {ulongitude} latitude = {users[0].latitude} distance={users[0].distance} longitude = {users[0].longitude} users={users} />
    </>
 )}
    
  </div>
  
  )
}

export default Rest
