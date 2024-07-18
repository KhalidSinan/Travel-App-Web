import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
// const images = [
//   { src: "https://via.placeholder.com/300x140", title: "Image 1" },
//   { src: "https://via.placeholder.com/300x140", title: "Image 2" },
//   { src: "https://via.placeholder.com/300x140", title: "Image 3" },
//   { src: "https://via.placeholder.com/300x140", title: "Image 4" },
// ];
const ImageList = ({ proofs }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      {proofs.map((proof, index) => (
        <Card key={index} sx={{ width: 400 }}>
          <CardMedia
            component="img"
            height="140"
            image={proof.picture}
            alt={proof.name}
          />
          <Box
            sx={{
              padding: "10px",
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            <Typography variant="body1">{proof.name}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ImageList;
