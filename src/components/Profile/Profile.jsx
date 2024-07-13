import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Backend_url } from '../../../BackendUrl';
import { useNavigate } from "react-router-dom";

function Profile({ isWorker, userData }) {
    const [openSnack, setOpenSnack] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [file, setFile] = useState(null);
    const [avatar, setAvatar] = useState(userData.avatar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage("");
        setErrorMessage("");
        setIsError(false);
        setOpenSnack(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async () => {
        try {
            const accessToken = getCookie('accessToken');
            if (!accessToken) {
                console.error("Access token not found");
                return null;
            }

            const formData = new FormData();
            formData.append('avatar', file);

            await axios.patch(`${Backend_url}/api/v1/users/avatar`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setSuccessMessage("Profile updated successfully");
            setIsError(false);
            setOpenSnack(true);
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Failed to update profile");
            setIsError(true);
            setOpenSnack(true);
        }
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

    // Defaulting userData properties to empty strings if undefined or null
    const { fullName = '', username = '', email = '', contactNo = '', language = '', address = '' } = userData;

    return (
        <div>
            <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={isError ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {isError ? errorMessage : successMessage}
                </Alert>
            </Snackbar>
            <div className='flex gap-4 justify-center'>
                <Avatar src={avatar} className='h-32 w-32' />
                <div className='flex-col space-y-10 py-4'>
                    <div>
                        {isWorker ? <Chip color="danger" variant='flat' size='xl'>Worker</Chip> : <Chip color="success" variant='flat' size='xl'>Customer</Chip>}
                    </div>
                    <div className='flex gap-4 items-end'>
                        <Button color="success" variant='flat' className='w-4' onClick={() => document.getElementById('avatarUpload').click()}>
                            <EditIcon />
                        </Button>
                        <input
                            type="file"
                            accept="image/*"
                            id="avatarUpload"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <Button color="success" variant='flat' onClick={handleFormSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <Table hideHeader aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Value</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell><Chip color="success">Name</Chip></TableCell>
                            <TableCell>{fullName}</TableCell>
                        </TableRow>
                        <TableRow key="2">
                            <TableCell><Chip color="success">Username</Chip></TableCell>
                            <TableCell>{username}</TableCell>
                        </TableRow>
                        <TableRow key="3">
                            <TableCell><Chip color="success">Email</Chip></TableCell>
                            <TableCell>{email}</TableCell>
                        </TableRow>
                        <TableRow key="4">
                            <TableCell><Chip color="success">Contact No.</Chip></TableCell>
                            <TableCell>{contactNo}</TableCell>
                        </TableRow>
                        <TableRow key="6">
                            <TableCell><Chip color="success">Language</Chip></TableCell>
                            <TableCell>{language}</TableCell>
                        </TableRow>
                        <TableRow key="7">
                            <TableCell><Chip color="success">Address</Chip></TableCell>
                            <TableCell>{address}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Profile;
