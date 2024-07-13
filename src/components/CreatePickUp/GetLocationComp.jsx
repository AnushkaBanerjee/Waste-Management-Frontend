import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import locationbg from "../../assets/PickUp/location.png";
import tt from '@tomtom-international/web-sdk-maps';
import AddIcon from '@mui/icons-material/Add';

const GetLocation = ({ step, setStep }) => {
  const [location, setLocation] = useState(null);
  const [instructions, setInstructions] = useState('');
  const [showMarker, setShowMarker] = useState(false);
  const [showInstructionInput, setShowInstructionInput] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem('userLocation'));
    const storedInstructions = localStorage.getItem('pickupInstructions');
    if (storedLocation) {
      setLocation(storedLocation);
    }
    if (storedInstructions) {
      setInstructions(storedInstructions);
    }
  }, []);

  useEffect(() => {
    if (location && mapContainerRef.current) {
      const map = tt.map({
        key: import.meta.env.VITE_TOM_TOM_API_KEY,
        container: mapContainerRef.current,
        center: [location.longitude, location.latitude],
        zoom: 18
      });

      mapInstanceRef.current = map;

      return () => map.remove();
    }
  }, [location]);

  useEffect(() => {
    if (showMarker && location && mapInstanceRef.current) {
      if (!markerRef.current) {
        const marker = new tt.Marker().setLngLat([location.longitude, location.latitude]).addTo(mapInstanceRef.current);
        markerRef.current = marker;
      } else {
        markerRef.current.setLngLat([location.longitude, location.latitude]);
      }
    }
  }, [showMarker, location]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { latitude, longitude };
          localStorage.setItem('userLocation', JSON.stringify(userLocation));
          setLocation(userLocation);
          setShowMarker(true);

          alert('Location and instructions stored successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleShowInstructionInput = () => {
    setShowInstructionInput(true);
  };

  const handleCancelInstruction = () => {
    setInstructions('');
    setShowInstructionInput(false);
  };

  return (
    <div className="p-4 overflow-hidden bg-white-default rounded-md w-full">
      <div className='md:flex justify-center gap-12 w-full my-8 space-y-12'>
        <div className='w-full m-4'>
          {location && (
            <div
              id="map"
              ref={mapContainerRef}
              style={{width:"90%",height: '400px', marginTop: '20px' }}
            ></div>
          )}
        </div>
        <div className='text-center items-center gap-2 space-y-6 my-auto w-full'>
        <div className='flex justify-center items-center'>
            {!showInstructionInput && (
              <div className='flex justify-center items-center gap-2 text-blue-default cursor-pointer'>
                <AddIcon />
                <p
                  onClick={handleShowInstructionInput}
                  className=''
                >
                  Add Delivery Instruction
                </p>
              </div>
            )}

            {showInstructionInput && (
              <div className="mt-4 w-80">
                <TextField
                  id="instructions"
                  label="Delivery Pickup Instructions"
                  multiline
                  rows={4}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <div className="mt-2">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCancelInstruction}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className='w-full flex justify-between px-8'>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetLocation}
            >
              Pick Up Location
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() =>{ 
                localStorage.setItem('pickupInstructions', instructions);
                setStep(step + 1)
                }}
            >
              Next
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default GetLocation;
