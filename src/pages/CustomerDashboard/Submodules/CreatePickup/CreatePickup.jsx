import React from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Backend_url } from '../../../../../BackendUrl';
import { useLoaderData } from 'react-router-dom';
import GetLocation from '../../../../components/CreatePickUp/GetLocationComp';
import AddItem from '../../../../components/CreatePickUp/AddItemComp';
import PreviewItem from '../../../../components/CreatePickUp/PreviewItemComp';

function CreatePickup
() {
  const [userData, setUserData] = useState();
  const [step,setStep] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
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
      <Banner customer={userData?.data.fullName} page="Add Pickup" />
      <div className="flex flex-wrap gap-2 px-2 py-8 lg:gap-11 lg:p-4">

        {step === 0 && <GetLocation step={step} setStep={setStep} />}
        {step === 1 && <AddItem step={step} setStep={setStep} setThumbnail={setThumbnail} thumbnail={thumbnail} />}
        {step === 2 && <PreviewItem step={step} setStep={setStep} thumbnail={thumbnail} />}
        
      </div>
    </div>
  )
}

export default CreatePickup;
