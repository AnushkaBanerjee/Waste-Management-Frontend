import React from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import axios from 'axios';
import { Backend_url } from '../../../../../BackendUrl';
import WorkerPreview from '../../../../components/Preview/WorkerPreview';

const WorkerHome = () => {
  const [userData, setUserData] = useState();
  const data = useLoaderData();
  const [pickups, setPickups] = useState([]);
  const [yourId, setYourId] = useState();
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

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

  const getPickups = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.get(`${Backend_url}/api/v1/pickup/worker/view`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setYourId(response.data.data.current_user._id);
      setPickups(response.data.data.pickups);
    } catch (error) {
      console.log(error);
    }

  };

  const users = [
    {
      id: 1,
      name: "Tony Reichert",
      status: "active",
      pickupId: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
      id: 2,
      name: "Zoey Lang",
      status: "paused",
      pickupId: "25",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      id: 3,
      name: "Jane Fisher",
      status: "active",
      pickupId: "22",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      id: 4,
      name: "William Howard",
      status: "vacation",
      pickupId: "28",
      avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    },
    {
      id: 5,
      name: "Kristen Copper",
      status: "active",
      pickupId: "24",
      avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    },
  ];

  useEffect(() => {
    setUserData(data);
    getPickups();
  }, [data]);

  return (
    <div style={{
      height: "calc(100vh - 4.3rem)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      overflowY: "scroll",
      overflowX: "hidden",
      background: "#EDE9E9"
    }}>
      <Banner customer={userData?.data.fullName} page="Explore New Pickups" />
      {step == 0 && <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table stickyHeader >
          <TableHead className='text-xs uppercase '>
            <TableRow>
              <TableCell><strong>Avatar</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Pick Up ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pickups?.filter(pickup => pickup.status === "pending").map(pickup => (
              <TableRow key={pickup._id} className='text-xs'>
                <TableCell>
                  <img src={pickup.owner.avatar} alt={`${pickup.owner.fullName}'s avatar`} style={{ width: "50px", borderRadius: "50%" }} />
                </TableCell>
                <TableCell>{pickup.owner.fullName}</TableCell>
                <TableCell>{pickup._id}</TableCell>
                <TableCell>{new Date(pickup.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={pickup.status === "active" ? "success" : pickup.status === "paused" ? "error" : "secondary"}
                  >
                    {pickup.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="preview" onClick={() => {
                    setSelectedId(pickup._id);
                    setStep(1);
                  }}>
                    <RemoveRedEyeOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>}
      {step == 1 && <div>
        <WorkerPreview step={step} setStep={setStep}
          selectedId={selectedId} setSelectedId={setSelectedId}
          getPickups={getPickups} />
      </div>
      }
    </div>
  );
};

export default WorkerHome;
