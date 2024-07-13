import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Grid
} from '@mui/material';
import axios from 'axios';
import { Backend_url } from '../../../BackendUrl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const PreviewItem = ({ step, setStep, thumbnail }) => {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage("");
    setErrorMessage("");
    setOpenSnack(false);
    setIsError(false);
  };
  const navigateTo = useNavigate();
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [image, setImage] = useState(null); // State to store the image data
  const [userLocation, setUserLocation] = useState(null); // State to store user's location
  const [price, setPrice] = useState([]);
  const [qty, setQty] = useState([]);
  const [itemDescription, setItemDescription] = useState([]);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('addItemData'));
    const itemData = JSON.parse(localStorage.getItem('addItemItems'));

    if (storedData && storedData.items) {
      const items = [];
      const quantity = [];
      const description = [];
      itemData.forEach(item => {
        if (item.checked) {
          items.push(item.price);
          quantity.push(item.quantity);
          description.push(item.description);
        } else {
          items.push(0);
          quantity.push(0);
          description.push('');
        }
      });
      setPrice(items);
      setQty(quantity);
      setItemDescription(description);
      setItems(storedData.items);
      calculateTotals(storedData.items);
      setImage(storedData.image); // Set the image from stored data
    } else {
      navigateTo('/Customer/Add-Pickup');
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

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const handleConfirm = async () => {
    const dataToStore = {
      items,
      totalQuantity,
      totalPrice,
      image, // Include the image in the data to store
      userLocation, // Include user's location in the data to store
    };
    // localStorage.setItem('confirmedOrderData', JSON.stringify(dataToStore));


    try {
      // Make API call to place order
      // If successful, set orderPlaced to true
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.post(`${Backend_url}/api/v1/pickup/create`, {
        thumbnail: thumbnail,
        description: localStorage.getItem('pickupInstructions'),
        location: [userLocation.latitude, userLocation.longitude],
        customerPrice: price,
        itemDescription: itemDescription,
        qty: qty
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        }
      });
      setSuccessMessage("Pickup Added Successfully!");
      setIsError(false);
      setOpenSnack(true);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage("Error adding pickup. Please try again later.");
      setIsError(true);
      setOpenSnack(true);
    }
    localStorage.removeItem('addItemItems'); // Remove stored items data
    localStorage.removeItem('addItemData'); // Remove stored image and items data
    localStorage.removeItem('userLocation'); // Remove user location
    localStorage.removeItem('pickupInstructions'); // Remove pickup instructions
  };

  return (
    <Grid container spacing={3}>
      <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert
          onClose={handleClose}
          severity={isError ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {isError ? errorMessage : successMessage}
        </Alert>
      </Snackbar>
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
