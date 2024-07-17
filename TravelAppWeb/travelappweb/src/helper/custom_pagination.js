import React from "react";
import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "rgb(32, 94, 97)", // Default color for pagination items
          },
          "& .Mui-selected": {
            backgroundColor: "rgb(32, 94, 97)", // Background color for selected item
            color: "white", // Text color for selected item
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "rgba(32, 94, 97, 0.1)", // Hover effect background color
            color: "rgb(32, 94, 97)", // Text color for hover effect
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;
