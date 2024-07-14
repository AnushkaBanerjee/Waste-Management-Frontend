import React, { useEffect, useState } from 'react';
import Banner from '../../../../components/Global/Banner/Banner';
import axios from 'axios';
import { Backend_url } from '../../../../../BackendUrl';
import { useLoaderData } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ScheduleDialog from './ScheduleDialog'; // Adjust the path as necessary

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#059212",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function MyPickups() {
  const [userData, setUserData] = useState();
  const [pickups, setPickups] = useState([]);
  const [yourId, setYourId] = useState();
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const data = useLoaderData();

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

      const filteredPickups = response.data.data.pickups.filter(pickup => pickup.worker?.toString() === response.data.data.current_user._id.toString());

      setPickups(filteredPickups);
      setYourId(response.data.data.current_user._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setUserData(data);
    getPickups();
  }, [data]);

  const handleOpenScheduleDialog = (pickup) => {
    setSelectedPickup(pickup);
    setOpenScheduleDialog(true);
  };

  const handleCloseScheduleDialog = () => {
    setOpenScheduleDialog(false);
    setSelectedPickup(null);
  };

  const handleScheduleSubmit = async(date) => {
    const pickupTime = new Date(date);
    try{
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.post(`${Backend_url}/api/v1/pickup/worker/giveTime?id=${selectedPickup._id}`, {
        time: pickupTime
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
    }
    catch(error){
      console
    }
    window.location.reload();
    // Add your scheduling logic here, e.g., sending a request to the backend
  };

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Pickup ID</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pickups?.map((pickup) => (
              <StyledTableRow key={pickup._id}>
                <StyledTableCell align="center">
                  <div className='flex justify-center items-center'>
                    <Avatar alt={pickup.owner.fullName} src={pickup.owner.avatar} />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">{pickup.owner.fullName}</StyledTableCell>
                <StyledTableCell align="center">{pickup._id}</StyledTableCell>
                <StyledTableCell align="center">
                  <Chip label={pickup.status} color={pickup.status === 'accepted' ? 'warning' : pickup.status === 'scheduled' ? 'primary' : 'success'} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className='flex justify-end gap-4'>
                    {pickup.status === "accepted" && <Button variant="contained" onClick={() => {
                      setSelectedPickup(pickup);
                      handleOpenScheduleDialog(pickup)
                    }}>Schedule Time</Button>}
                    <Button color="success" variant="contained">View</Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ScheduleDialog
        open={openScheduleDialog}
        onClose={handleCloseScheduleDialog}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
}

export default MyPickups;
