import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: "var(--secondary-color)",
  fontWeight: 'bold',
  fontSize: '1.1rem',
}));


const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "var(--text-color)",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "var(--text-color)",
  },
}));


const CustomTableCV = ({ tableData }) => {
  return (
    <TableContainer component={Paper} sx={{ flex: 1, backgroundColor: "var(--card-color)" }}>
      <Table aria-label="organizer details">
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>General</StyledTableHeadCell>
            <StyledTableHeadCell>Info</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <StyledTableCell>{row.label}</StyledTableCell>
              <StyledTableCell>{row.value}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTableCV;
