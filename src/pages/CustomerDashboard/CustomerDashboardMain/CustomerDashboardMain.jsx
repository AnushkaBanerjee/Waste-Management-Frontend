
import React,{useState,useEffect} from 'react';
import CustomerSidebar from '../../../components/Global/CustomerSidebar/CustomerSidebar';
import ProfileBar from '../../../components/Global/ProfileBar/ProfileBar';
// import { faHome, faTasks , faSearch, faEnvelope, faChartBar,faTimeline,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom'
import { Backend_url } from '../../../../BackendUrl';


const CustomerDashboard = () => {
  const menuItems = [

    { id:1, name: "Home", route: "Customer/Home",icon:"Student/Home" },
    { id:2, name: "Analytics", route: "Customer/Analytics",icon:"chart-bar" }, 
    { id:3, name: "Add Pickup", route: "Student/Roadmap",icon:"tasks" },
  ];
  const title = "Customer Dashboard";
  const userRole = "customer";

  const data = useLoaderData()
  const [avatar,setAvatar] = useState()
  const [role,setRole] = useState()
  const [reload,setReload] = useState()

  useEffect(() => {
    setAvatar(data.data.avatar)
    setRole(data.data.role)
  }, [data.data.avatar,data.data.fullName,reload])


  return (
    <div className="flex flex-col bg-grey-default h-screen overflow-hidden">
      
      <div className="flex flex-1">
        <CustomerSidebar menuItems={menuItems} />
        
        <div className="flex-1 overflow-y-auto">
        {/* <Navbar avatar={avatar} name={name} isStudent={true}/> */}
        <ProfileBar isWorker={false} image={avatar} userData={data?.data} setReload={setReload}/>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

export const customerInfoLoader = async () => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      console.error("Access token not found");
      return null;
    }

    const response = await axios.get(`${Backend_url}/api/v1/users/current-customer`, {
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

