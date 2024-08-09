import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination, {
  tablePaginationClasses,
} from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel, {
  tableSortLabelClasses,
} from "@mui/material/TableSortLabel";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "var(--text-color)",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "var(--text-color)",
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  [`&.${tableSortLabelClasses.active}`]: {
    color: "var(--text-color)",
  },
  [`&.${tableSortLabelClasses.root}`]: {
    color: "var(--text-color)",
  },
}));

const StyledTablePagination = styled(TablePagination)(() => ({
  [`&.${tablePaginationClasses.root}`]: {
    color: "var(--text-color)",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "reservations",
    numeric: true,
    label: "Reservations",
  },
];

const HotelsTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell key="id" align="right" padding="normal">
          ID
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell key="location" align="left" padding="normal">
          Location
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

HotelsTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const HotelsTable = ({ hotels }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - hotels.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(hotels, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, hotels]
  );

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          aria-label="sticky table"
          sx={{ minWidth: 500 }}
          size="medium"
          aria-labelledby="tableTitle"
        >
          <HotelsTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={hotels.length}
          />
          <TableBody>
            {visibleRows.map((hotel) => {
              return (
                <TableRow tabIndex={-1} key={hotel.id}>
                  <StyledTableCell width={1} align="right">
                    {hotel.id.substring(0,9)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{hotel.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {hotel.reservationCount}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {hotel.location}
                  </StyledTableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

HotelsTable.propTypes = {
  hotels: PropTypes.array.isRequired,
};

export default HotelsTable;
