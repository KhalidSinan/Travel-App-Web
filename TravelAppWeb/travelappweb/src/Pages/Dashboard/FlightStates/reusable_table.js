import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: 'var(--text-color)',
    fontSize: '1rem',
  },
  [`&.${tableCellClasses.body}`]: {
    color: 'var(--text-color)',
    fontSize: '0.875rem',
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '&.Mui-active': {
    color: 'var(--text-color)',
  },
  '& .MuiTableSortLabel-icon': {
    color: 'var(--text-color)!important',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#ffb156",
}));

const ReusableTable = ({ data, order, orderBy, onRequestSort }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const sortedData = data.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "var(--card-color)",
        height:'300 px'
      }}
    >
      <Table>
        <TableHead>
          <StyledTableRow>
            {Object.keys(data[0]).map((key) => (
              <StyledTableCell
                key={key}
                sortDirection={orderBy === key ? order : false}
              >
                <StyledTableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : 'asc'}
                  onClick={createSortHandler(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </StyledTableSortLabel>
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index} sx={index === 0 ? {  } : {}}>
              {Object.keys(row).map((key, idx) => (
                <StyledTableCell key={idx}>
                  {key === 'logo' ? (
                    <img src={row[key]} alt={row['airline']} style={{ height: 40 }} />
                  ) : (
                    row[key]
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};

ReusableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default ReusableTable;
