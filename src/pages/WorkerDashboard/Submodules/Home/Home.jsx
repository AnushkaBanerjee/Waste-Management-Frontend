import React from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_url } from '../../../../../BackendUrl';
import { useLoaderData } from 'react-router-dom';
import PickupHistory from './Submodules/PickupHistory/PickupHistory';

function WorkerHome
() {
  const [userData, setUserData] = useState();
    const data = useLoaderData()
  
    useEffect(() => {
      setUserData(data);
    }, []);
  return (
    <div style={{height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection:"column",
      padding: "1rem",
      overflowY: "scroll",  
      overflowX: "hidden",
      background:"#EDE9E9"}}>
      <Banner customer={userData?.data.fullName} page="Explore New Pickups" />
    
        
        
        <PickupHistory />

       
        
      
    </div>
  )
}

export default WorkerHome;
