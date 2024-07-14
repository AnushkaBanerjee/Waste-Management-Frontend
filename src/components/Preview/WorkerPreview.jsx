import React, { useEffect, useRef, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';
import { Backend_url } from '../../../BackendUrl';
import { useDisclosure } from "@nextui-org/react";

const WorkerPreview = ({ step, setStep, selectedId, setSelectedId, getPickups }) => {
    const navigate = useNavigate();
    const mapContainerRef = useRef(null);
    const [formData, setFormData] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [requests, setRequests] = useState([]);
    const [inputValues, setInputValues] = useState([]);

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

    const getDetails = async () => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            const response = await axios.get(`${Backend_url}/api/v1/pickup/details?id=${selectedId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const result = response.data.data;
            const fetchedData = {
                id: result.pickup._id,
                ownerName: result.owner.fullName,
                date: new Date(result.pickup.createdAt).toLocaleString(),
                status: result.pickup.status,
                workerName: result.worker?.fullName,
                pickupTime: new Date(result.pickup.timeArrival).toLocaleString(),
                imageUrl: result.pickup.thumbnail,
                items: result.pickup.items.map((item, index) => ({
                    category: item,
                    quantity: result.pickup.qty[index],
                    description: result.pickup.itemDescription[index],
                    price: result.pickup.customerPrice[index],
                    offerPrice: result.pickup.workerPrice.length > 0 ? result.pickup.workerPrice[index] : 0,
                })),
            };
            setFormData(fetchedData);
            setInputValues(fetchedData.items.map(item => item.price === 0 ? 0 : item.offerPrice));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    useEffect(() => {
        if (mapContainerRef.current) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;

                    const map = tt.map({
                        key: import.meta.env.VITE_TOM_TOM_API_KEY,
                        container: mapContainerRef.current,
                        center: [longitude, latitude],
                        zoom: 18,
                    });

                    const marker = new tt.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(map);

                    return () => map.remove();
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        }
    }, [mapContainerRef.current]);

    const handleInputChange = (index, value) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = value;
        setInputValues(updatedValues);
    };

    const handleSubmit = async() => {
        const finalValues = inputValues.map((value, index) => formData.items[index].price === 0 ? 0 : value); 
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }
            const response = await axios.post(`${Backend_url}/api/v1/request/create?pickupId=${selectedId}`, {
                reqPrice: finalValues,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    const totalQuantity = formData.items.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    const totalPrice = formData.items.reduce((sum, item) => sum + (parseInt(item.quantity) * parseInt(item.price)), 0);
    const totalOfferPrice = inputValues.reduce((sum, value, index) => sum + (parseInt(formData.items[index].quantity) * parseInt(value)), 0);

    return (
        <div className="mx-auto p-8 w-full bg-white-default rounded-md">
            <div className='mb-6'>
                <Typography variant='h4' className='text-center'>Pickup Details</Typography>
            </div>
            <div className='mb-8 space-y-2'>
                <p className='text-xl font-medium'>
                    ID:{" "}
                    <span className='text-[#6b738b] font-normal'>
                        {formData.id}
                    </span>
                </p>
                <p className='text-xl font-medium'>
                    Owner Name:{" "}
                    <span className='text-[#6b738b] font-normal'>
                        {formData.ownerName}
                    </span>
                </p>
                <p className='text-xl font-medium'>
                    Date:{" "}
                    <span className='text-[#6b738b] font-normal'>
                        {formData.date}
                    </span>
                </p>
                <p className='text-xl font-medium'>
                    Status:{" "}
                    <span className='text-[#6b738b] font-normal'>
                        {formData.status}
                    </span>
                </p>
                {formData.status !== "pending" && formData.status !== "cancelled" && (
                    <p className='text-xl font-medium'>
                        Worker Name:{" "}
                        <span className='text-[#6b738b] font-normal'>
                            {formData.workerName}
                        </span>
                    </p>
                )}
                {formData.status === "completed" && formData.status === "scheduled" &&
                    <p className='text-xl font-medium'>
                        Pickup Time:{" "}
                        <span className='text-[#6b738b] font-normal'>
                            {formData.pickupTime}
                        </span>
                    </p>
                }
            </div>
            <div className="w-full md:flex items-center">
                <div className='w-full'>
                    <img src={formData.imageUrl} alt="Item Image" className="lg:w-[25vw] lg:h-[300px] md:w-[50vw] md:h[50vw] object-contain" />
                </div>

                <div
                    id="map"
                    ref={mapContainerRef}
                    className='lg:flex justify-center items-center w-full'
                    style={{ width: "100%", height: '300px', marginTop: '20px' }}
                />
            </div>
            <div className="mt-4">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className='text-xs uppercase '>
                            <TableRow>
                                <TableCell><strong>Category Name</strong></TableCell>
                                <TableCell><strong>Quantity (Kg)</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Demand Price/Kg</strong></TableCell>
                                <TableCell><strong>Offer Price/Kg</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell><strong>{item.category}</strong></TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                    
                                        <TextField
                                            type="number"
                                            value={parseFloat(inputValues[index])}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            disabled={item.price == 0}
                                            placeholder="e.g., 10"
                                        />
                                    </TableCell>
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
                <Button color="success" variant='outlined' onClick={() => window.location.reload()}>Back</Button>
                {formData.status === "pending" && <Button color="success" variant='contained' onClick={handleSubmit}>Make Request</Button>}
            </div>
        </div>
    );
};

export default WorkerPreview;
