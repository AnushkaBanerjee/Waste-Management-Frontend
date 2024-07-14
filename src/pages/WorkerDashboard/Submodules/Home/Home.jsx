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

const WorkerHome = () => {
  const [userData, setUserData] = useState();
  const data = useLoaderData();

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
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table>
          <TableHead className='text-xs uppercase '>
            <TableRow>
            <TableCell><strong>Avatar</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Pick Up ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} className='text-xs'>
                <TableCell>
                  <img src={user.avatar} alt={`${user.name}'s avatar`} style={{ width: "50px", borderRadius: "50%" }} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.pickupId}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={user.status === "active" ? "success" : user.status === "paused" ? "error" : "secondary"}
                  >
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="preview">
                    <RemoveRedEyeOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkerHome;
