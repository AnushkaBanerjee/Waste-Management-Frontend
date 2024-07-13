import React, { useState } from 'react';
import { Input, Image, Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoginBg from "../../assets/Login/Login.png";
import axios from 'axios';
import { Backend_url } from '../../../BackendUrl'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
    const navigate = useNavigate();
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
    const [avatar, setAvatar] = useState();
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        contactNumber: '',
        address: '',
        role: '',
        language: '',
        password: '',
    });



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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSelectChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        console.log('File:', file);
        try {
            const response = await axios.post(
                `${Backend_url}/api/v1/users/register`,
                {
                    email: formData.email,
                    username: formData.username,
                    fullName: formData.name,
                    contactNo: formData.contactNumber,
                    address: formData.address,
                    language: formData.language.target?.value,
                    role: formData.role.target?.value,
                    password: formData.password,
                    avatar: file,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setSuccessMessage("Account Created successfully");
            setIsError(false);
            setOpenSnack(true);
            setTimeout(() => {
                navigate("/Login");
            }, 2000)

        } catch (error) {
            if (error.response?.status === 400) {
                setErrorMessage("All fields are required");
            } else if (error.response?.status === 409) {
                setErrorMessage("User already exists");
            } else {
                setErrorMessage("Server error. Please try again later");
                console.log('Error:', error);
            }
            setIsError(true);
            setOpenSnack(true);
        }
    };

    return (
        <div
            className="bg-cover "
            style={{ backgroundImage: `url(${LoginBg})` }}
        >
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
            <div className="bg-gradient-to-tr from-blue-default to-blue-teal opacity-15 blur-sm "></div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 ">
                <div className="w-full rounded-lg  shadow-2xl shadow-blue-default sm:max-w-4xl xl:p-0 bg-grey-default bg-opacity-50 backdrop-filter backdrop-blur-lg border border-transparent border-opacity-0 my-16">
                    <div className="p-16 space-y-4 md:space-y-6 sm:p-16 ">
                        <h1 className="text-2xl text-center text-blue-dark font-inter leading-tight tracking-tight md:text-2xl">
                            Create New Account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className='w-full text-center space-y-4'>
                                <div className='flex justify-center'>
                                    <Image
                                        isZoomed
                                        alt="Profile Image"
                                        src={avatar}
                                        width={240}
                                        className='mx-auto'
                                    />
                                </div>
                                <Button
                                    variant="bordered"
                                    color='success'
                                    startContent={<CloudUploadIcon />}
                                    onClick={() => document.getElementById('avatarUpload').click()}
                                >
                                    Upload Profile Picture
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="avatarUpload"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Name"
                                    type="text"
                                    color="success"
                                    radius="lg"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                                <Input
                                    label="Username"
                                    type="text"
                                    color="success"
                                    radius="lg"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Email"
                                    type="email"
                                    color="success"
                                    radius="lg"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                                <Input
                                    label="Contact Number"
                                    type="phone"
                                    color="success"
                                    radius="lg"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Address"
                                    type="text"
                                    color="success"
                                    radius="lg"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>

                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Select
                                    label="Role"
                                    color="success"
                                    className="w-full"
                                    radius="lg"
                                    onChange={(value) => handleSelectChange('role', value)}
                                >
                                    <SelectItem key="customer" color="success">
                                        Customer
                                    </SelectItem>
                                    <SelectItem key="worker" color="success">
                                        Worker
                                    </SelectItem>
                                </Select>

                                <Select
                                    label="Language"
                                    color="success"
                                    className="w-full"
                                    radius="lg"
                                    onChange={(value) => handleSelectChange('language', value)}
                                >
                                    <SelectItem key="bengali" color="success">
                                        Bengali
                                    </SelectItem>
                                    <SelectItem key="english" color="success">
                                        English
                                    </SelectItem>
                                    <SelectItem key="hindi" color="success">
                                        Hindi
                                    </SelectItem>
                                </Select>
                            </div>

                            <div className='space-y-4 sm:space-y-0 sm:flex sm:gap-4'>
                                <Input
                                    label="Password"
                                    type="password"
                                    color="success"
                                    radius="lg"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    classNames={{
                                        label: "text-blue-default font-inter",
                                        input: [
                                            "bg-transparent",
                                            "text-blue-dark font-inter",
                                            "focus:text-blue-dark",
                                        ],
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: [
                                            "border border-blue-100 shadow-blue-100 rounded-lg border-2",
                                            "bg-white-default/50",
                                            "hover:border-blue-default/50",
                                            "hover:bg-white-default/50",
                                            "focus:bg-white-200/50",
                                            "focus:text-blue-default font-inter",
                                            "group-data-[focus=true]:bg-white-200/50",
                                            "!cursor-text",
                                        ],
                                    }}
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-fit text-white-default bg-blue-default focus:ring-4 focus:outline-none focus:bg-white-default focus:text-blue-dark focus:ring-success-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create Account
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <p className="text-m font-medium font-inter">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium font-inter text-blue-default hover:underline"
                                    >
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
