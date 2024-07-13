import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, TextField, Button, IconButton, Grid, Box
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const categories = ['Paper', 'Plastic', 'Glass', 'Metal', 'Organic', 'E-waste', 'Others'];

const AddItem = () => {
  const navigateTo = useNavigate();
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('addItemItems');
    return storedItems ? JSON.parse(storedItems) : categories.map(category => ({
      category,
      quantity: '',
      description: '',
      price: '',
      checked: false,
      touched: {
        quantity: false,
        price: false,
      }
    }));
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    localStorage.setItem('addItemItems', JSON.stringify(items));
  }, [items]);

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleBlur = (index, field) => {
    const updatedItems = [...items];
    updatedItems[index].touched[field] = true;
    setItems(updatedItems);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePrev = () => {
    navigateTo('/getLocation');
  };

  const handleNext = () => {
    const selectedItems = items.filter(item => item.checked);
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }

    for (const item of selectedItems) {
      if (item.quantity <= 0) {
        alert(`Quantity for ${item.category} must be greater than 0.`);
        return;
      }
      if (item.price <= 0) {
        alert(`Demand Price/Kg for ${item.category} must be greater than 0.`);
        return;
      }
    }

    const hasZeroValue = selectedItems.some(item => item.quantity <= 0 || item.price <= 0);
    if (hasZeroValue) {
      alert('Please ensure all quantities and prices are greater than 0.');
      return;
    }

    const data = {
      items: selectedItems,
      image: image ? URL.createObjectURL(image) : null,
    };

    localStorage.setItem('addItemData', JSON.stringify(data));
    navigateTo('/previewItem');
  };

  return (
    <Grid container spacing={3} style={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <div className="p-4">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Select</TableCell>
                  <TableCell>Item Category</TableCell>
                  <TableCell>Quantity (Kg)</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Demand Price/Kg</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={item.category}>
                    <TableCell>
                      <Checkbox
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                        onBlur={() => handleBlur(index, 'quantity')}
                        disabled={!item.checked}
                        InputProps={{ inputProps: { min: 1 } }}
                        error={item.touched.quantity && item.quantity <= 0}
                        helperText={item.touched.quantity && item.quantity <= 0 ? "Must be greater than 0" : ""}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        disabled={!item.checked}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.price}
                        onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                        onBlur={() => handleBlur(index, 'price')}
                        disabled={!item.checked}
                        placeholder="e.g., 10"
                        InputProps={{ inputProps: { min: 1 } }}
                        error={item.touched.price && item.price <= 0}
                        helperText={item.touched.price && item.price <= 0 ? "Must be greater than 0" : ""}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="my-4">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-image"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="upload-image">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>

          {imagePreview && (
            <div className="my-4">
              <img src={imagePreview} alt="Selected" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button variant="contained" color="primary" onClick={handlePrev} style={{ minWidth: '100px' }}>
            Prev
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext} style={{ minWidth: '100px' }}>
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddItem;
