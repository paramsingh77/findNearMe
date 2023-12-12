import React from 'react';

const SecondaryModal = ({ user, onClose }) => {
  return (
    <div className='secondary-modal'>
      {/* Add your modal content here */}
      <h2>{user.name}</h2>
      <p>{user.description}</p>
      {/* Add more details as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SecondaryModal;