
import React from "react";
import { Typography } from "@mui/material";

const Header = ({ text }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        display: "flex",
        marginBottom: "20px",
        fontWeight: "bold",
        color: "var(--primary-color)",
        alignItems: "flex-start",
      }}
    >
      {text}
    </Typography>
  );
};

export default Header;
