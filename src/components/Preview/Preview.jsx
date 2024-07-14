import React, { useEffect, useRef } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import tt from '@tomtom-international/web-sdk-maps';

const Preview = ({step,setStep,selectedId,setSelectedId,getPickups}) => {
  const navigate = useNavigate();
  const mapContainerRef = useRef(null);
  const formData = {
    id: '4',
    ownerName: 'David Kumar',
    date: '2024-07-17',
    status: 'pending',
    workerName: 'Rahat Fateh Ali Khan',
    pickupTime: '7.00 pm',
    imageUrl: 'https://media.wired.com/photos/635332d4df421c97f296e358/master/pass/How-To-Extract-Text-From-Any-Image-Gear-679592092.jpg',
    items: [
      { category: 'Paper', quantity: '10', description: 'Various types of paper', price: '25', offerPrice: '20' },
      { category: 'Metal', quantity: '8', description: 'Different metal objects.', price: '30', offerPrice: '20' },
    ],
  };

  let totalQuantity = 0;
  let totalPrice = 0;
  let totalOfferPrice = 0;

  formData.items.forEach(item => {
    totalQuantity += parseInt(item.quantity);
    totalPrice += parseInt(item.price);
    totalOfferPrice += parseInt(item.offerPrice);
  });

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        const map = tt.map({
          key: 'H8RW8U8PTOAP3iPVgBxSGU10oVTZiADe',
          container: mapContainerRef.current,
          center: [longitude, latitude], // Set to user's location
          zoom: 18,
        });

        // Add a marker to the map at user's location
        const marker = new tt.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map);

        return () => map.remove();
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="mx-auto p-8 ">
      <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col gap-8 sm:gap-8 justify-around items-center ">
        <div>
          <p className=' text-xl font-medium'>
            ID:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.id}
            </span>
          </p>
          <p className=' text-xl font-medium'>
            Owner Name:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.ownerName}
            </span>
          </p>
          <p className=' text-xl font-medium'>
            Date:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.date}
            </span>
          </p>
          <p className=' text-xl font-medium'>
            Status:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.status}
            </span>
          </p>
          <p className=' text-xl font-medium'>
            Worker Name:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.workerName}
            </span>
          </p>
          <p className=' text-xl font-medium'>
            Pickup Time:{" "}
            <span className='text-[#6b738b] font-normal'>
              {formData.pickupTime}
            </span>
          </p>
        </div>
        <div className=''>
          <img src={formData.imageUrl} alt="Item Image" className="lg:w-[25vw] lg:h-[300px] md:w-[50vw] md:h[50vw] object-contain" />
        </div>
        <div
          id="map"
          ref={mapContainerRef}
          className='lg:flex justify-center items-center hidden'
          style={{ width: '25vw', height: '300px', marginTop: '20px' }}
        ></div>
      </div>
      <div className="mt-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className='text-xs uppercase '>
              <TableRow>
                <TableCell ><strong>Category Name</strong></TableCell>
                <TableCell ><strong>Quantity (Kg)</strong></TableCell>
                <TableCell ><strong>Description</strong></TableCell>
                <TableCell ><strong>Demand Price/Kg</strong></TableCell>
                <TableCell ><strong>Offer Price/Kg</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell ><strong>{item.category}</strong></TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.offerPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={1}><strong>Total:</strong></TableCell>
                <TableCell><strong>{totalQuantity}</strong></TableCell>
                <TableCell></TableCell>
                <TableCell><strong>{totalPrice}</strong></TableCell>
                <TableCell><strong>{totalOfferPrice}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='flex justify-between mt-8'>
        <Button variant='outlined' onClick={() => {
          // setSelectedId(null);
          // getPickups();
          // setStep(0);  
          window.location.reload();
        }}>Back</Button>
        <Button variant='contained' color='success'>Mark Payment Done</Button>
        <Button variant='contained' color='primary'>View Request</Button>
      </div>
    </div>
  );
};

export default Preview;
