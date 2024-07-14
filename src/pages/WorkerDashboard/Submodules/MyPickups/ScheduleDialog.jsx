import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ScheduleDialog({ open, onClose, onSubmit }) {
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(date);
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>Schedule Pickup</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To schedule this pickup, please enter the date and time here.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="datetime"
          name="datetime"
          label="Date and Time"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Schedule</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ScheduleDialog;
