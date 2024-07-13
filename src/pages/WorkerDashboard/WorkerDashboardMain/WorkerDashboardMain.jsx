import React from 'react'
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
import WorkerSidebar from '../../../components/Global/WorkerSidebar/WorkerSidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'
import { Backend_url } from '../../../../BackendUrl';
import { useEffect, useState } from 'react';



function WorkerDashboardMain() {
    const menuItems = [
        { id: 1, name: "Home", route: "Worker/Home", icon: "worker/Home" },
        { id: 2, name: "Analytics", route: "Worker/Analytics", icon: "chart-bar" },
        { id: 3, name: "My Pickups", route: "Worker/Roadmap", icon: "tasks" },
    ];
    const data = useLoaderData()
    const [avatar, setAvatar] = useState()
    const [role, setRole] = useState()
    const [reload, setReload] = useState()

    useEffect(() => {
        setAvatar(data.data.avatar)
        setRole(data.data.role)
    }, [data.data.avatar, data.data.fullName, reload])
    return (
        <div className="flex flex-col bg-grey-default h-screen overflow-hidden">
            <div className="flex flex-1">
                <WorkerSidebar menuItems={menuItems} />
                <div className="flex-1 overflow-y-auto">
                    {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
                    <ProfileBar isWorker={true} image={avatar} userData={data?.data} />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default WorkerDashboardMain


export const workerInfoLoader = async () => {
    try {
        const accessToken = getCookie('accessToken');
        if (!accessToken) {
            console.error("Access token not found");
            return null;
        }

        const response = await axios.get(`${Backend_url}/api/v1/users/current-worker`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
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