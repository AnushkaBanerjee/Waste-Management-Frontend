import React from 'react';
import { Link } from 'react-router-dom';

const GetLocation = ({step,setStep}) => {
  const handleGetLocation = () => {
    // Check if the browser supports the Geolocation API
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          const location = { latitude, longitude };

          // Store the location in local storage as a JSON string
          localStorage.setItem('userLocation', JSON.stringify(location));

          // Notify the user that the location has been stored
          alert('Location stored successfully!');
        },
        (error) => {
          // Handle any errors that occur while retrieving the location
          console.error('Error getting location:', error);
          alert('Unable to retrieve location.');
        }
      );
    } else {
      // Notify the user if Geolocation is not supported by the browser
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGetLocation}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Pick Up Location
      </button>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 ml-4"
          onClick={() => setStep(step + 1)}
        >
          Next
        </button>

    </div>
  );
};

export default GetLocation;
