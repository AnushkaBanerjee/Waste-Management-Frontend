import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue} from "@nextui-org/react";

import {DeleteIcon} from "../Extras/DeleteIcon/DeleteIcon";
import {EyeIcon} from "../Extras/EyeIcon/EyeIcon";


const statusColorMap = {
  accepted: "success",
  cancelled: "danger",
  pending: "warning",
  scheduled: "primary",
};

const columns = [
  {name: "Pickup ID", uid: "id"},
  {name: "Deadline", uid: "deadline"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const pickups = [
  {
    id: 1,
    deadline: "2021-09-10",
    status: "accepted",
  },
  {
    id: 2,
    deadline: "2021-09-10",
    status: "cancelled",

  },
  {
    id: 3,
    deadline: "2021-09-10",
    status: "pending",

  },
  {
    id: 4,
    deadline: "2021-09-10",
    status: "scheduled",

  },
  {
    id: 5,
    deadline: "2021-09-10",
    status: "accepted",
    
  },
];



export default function CustomerPickupHistory() {
  const renderCell = React.useCallback((pickups, columnKey) => {
    const cellValue = pickups[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: pickups.avatar}}
            description={pickups.email}
            name={cellValue}
          >
            {pickups.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{pickups.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[pickups.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-10">
            <Tooltip content="Preview">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>

            {/* <Tooltip color="danger" content="Delete pickups">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip> */}
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
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
