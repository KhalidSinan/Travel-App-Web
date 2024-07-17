import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   backgroundColor: "rgb(32,94,97)",
  color: "rgb(32,94,97)",
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));

const CustomTableCV = ({ tableData }) => {
  return (
    <TableContainer component={Paper} sx={{ flex: 1 }}>
      <Table aria-label="organizer details">
        <TableHead>
          <TableRow>
            <StyledTableCell>General</StyledTableCell>
            <StyledTableCell>Info</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTableCV;
