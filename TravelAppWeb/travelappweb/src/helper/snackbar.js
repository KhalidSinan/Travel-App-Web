import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
export default function AutohideSnackbar({ message }) {
  const [open, setOpen] = useState(message ? true : false);
 
  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  useEffect(() => {
    if (message === null) {
      setOpen(false);
    }
    setOpen(message ? true : false);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
 
    setOpen(false);
  };

  return (
    <div>
     
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message={message}
          ContentProps={{
            sx: {
              background: "var(--primary-color)"
            }
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
 
    </div>
  );
}
