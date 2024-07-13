import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Grid
} from '@mui/material';

const PreviewItem = ({step,setStep}) => {
  const navigateTo = useNavigate();
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [image, setImage] = useState(null); // State to store the image data
  const [userLocation, setUserLocation] = useState(null); // State to store user's location

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('addItemData'));
    if (storedData && storedData.items) {
      setItems(storedData.items);
      calculateTotals(storedData.items);
      setImage(storedData.image); // Set the image from stored data
    } else {
      navigateTo('/getLocation');
    }

    
    // Fetch user's location when component mounts
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        error => {
          console.error('Error getting user location:', error);
          setUserLocation(null);
        }
      );
    } else {
      console.log('Geolocation is not supported.');
      setUserLocation(null);
    }
  }, [navigateTo]);

  const calculateTotals = (items) => {
    let quantityTotal = 0;
    let priceTotal = 0;

    items.forEach(item => {
      const quantity = parseFloat(item.quantity);
      const pricePerKg = parseFloat(item.price);
      quantityTotal += quantity;
      priceTotal += quantity * pricePerKg;
    });

    setTotalQuantity(quantityTotal);
    setTotalPrice(priceTotal);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    const dataToStore = {
      items,
      totalQuantity,
      totalPrice,
      image, // Include the image in the data to store
      userLocation, // Include user's location in the data to store
    };
    localStorage.setItem('confirmedOrderData', JSON.stringify(dataToStore));

    setTimeout(() => {
      setOrderPlaced(true);
      localStorage.removeItem('addItemItems'); // Remove stored items data
      localStorage.removeItem('addItemData'); // Remove stored image and items data
      localStorage.removeItem('userLocation'); // Remove user location
    }, 1000);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div className="p-4">
          <Typography variant="h5" gutterBottom>
            Preview Items
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Category</TableCell>
                  <TableCell>Quantity (Kg)</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Demand Price/Kg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={1}><strong>Total:</strong></TableCell>
                  <TableCell><strong>{totalQuantity}</strong></TableCell>
                  <TableCell></TableCell>
                  <TableCell><strong>{totalPrice}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
      
      {!orderPlaced && (
        <>
          <Grid item xs={6}>
            <Button variant="contained" color="success" onClick={handlePrev}>
              Prev
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button variant="contained" color="success" onClick={handleConfirm}>
              Confirm
            </Button>
          </Grid>
        </>
      )}

      {/* Conditionally render success message based on orderPlaced state */}
      {orderPlaced && (
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Your order is successfully placed!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default PreviewItem;
