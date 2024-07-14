import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../Extras/DeleteIcon/DeleteIcon";
import { EyeIcon } from "../Extras/EyeIcon/EyeIcon";
import axios from "axios";
import { Backend_url } from "../../../../../../../BackendUrl";

const statusColorMap = {
  accepted: "success",
  cancelled: "danger",
  pending: "warning",
  scheduled: "primary",
};

const columns = [
  { name: "Pickup ID", uid: "_id" },
  { name: "Deadline", uid: "createdAt" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CustomerPickupHistory() {
  const [pickups, setPickups] = useState([]);
  const [isChange,setIsChange] = useState(0);
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
      const response = await axios.get(`${Backend_url}/api/v1/pickup/customer/view`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setPickups(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPickups();
  }, [isChange,setIsChange]);

  const handlePreview = (id) => {
    alert(`Preview pickup ID: ${id}`);
  };

  const handleDelete = async(id) => {
    alert(`Delete pickup ID: ${id}`);
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        console.error("Access token not found");
        return null;
      }
      const response = await axios.delete(`${Backend_url}/api/v1/pickup/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      setIsChange(1-isChange);
      
    } catch (error) {
      console.log(error);
    }
  };

  const renderCell = React.useCallback((pickup, columnKey) => {
    const cellValue = pickup[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[pickup.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "createdAt":
        return new Date(cellValue).toLocaleString();
      case "actions":
        return (
          <div className="relative flex items-center gap-10">
            <Tooltip content="Preview">
              <span 
                className="text-lg text-default-400 cursor-pointer active:opacity-50" 
                onClick={() => handlePreview(pickup._id)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete pickups">
              <span 
                className="text-lg text-danger cursor-pointer active:opacity-50" 
                onClick={() => handleDelete(pickup._id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={pickups}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
