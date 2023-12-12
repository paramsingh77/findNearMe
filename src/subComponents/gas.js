import React from 'react'

const gas = () => {

    const url = 'http://localhost:8080/api/nearby-location/gasStation';
    const [users, setUsers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading,setLoading]  = useState(true);
    const fetchData = async (latitude,longitude) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude,
            longitude,
            category: 'restaurant',
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setUsers(data); 
        console.log(data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };
    console.log('users',users[0]);

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


  return (
    <div>
      
    </div>
  )
}

export default gas
