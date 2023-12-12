import React, { useEffect, useState } from 'react';
const Hospitals = () => {

    const url = 'http://localhost:8080/api/nearby-location/hospital';
    const [users, setUsers] = useState([]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: 37.7749,
            longitude: -122.4194,
            category: 'Hospitals',
          }),
        });
  
        if (!response.ok) {
          throw new Error('Bad Network');
        }
  
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    })

  return (
    <div>
      Hospital component
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={`${user.latitude}-${user.longitude}`}>
              Latitude: {user.latitude}, Longitude: {user.longitude}, Distance: {user.distance} , Picture: {user.image_url}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Hospitals
