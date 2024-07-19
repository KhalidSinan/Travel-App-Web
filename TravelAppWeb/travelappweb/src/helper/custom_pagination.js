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
            color: "var(--primary-color)", // Default color for pagination items
          },
          "& .Mui-selected": {
            backgroundColor: "var(--primary-color)", // Background color for selected item
            color: "var(--secondary-color)", // Text color for selected item
          },
          "& .MuiPaginationItem-page:hover": {
            backgroundColor: "var(--primary-color)", // Hover effect background color
            color: "var(--secondary-color)", // Text color for hover effect
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;
