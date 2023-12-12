import React, { useEffect, useState } from 'react';

const Motels = () => {
    const url = 'http://localhost:8080/api/nearby-location/motels';
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
          category: 'restaurant',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    Motel component
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

export default Motels
