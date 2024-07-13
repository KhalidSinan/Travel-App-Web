import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import CustomButton from "../../helper/Components/CustomButton/CustomButton.js";
import styles from './AdminsList.module.css';
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton.js";
import { BsCrosshair, BsTrash2, BsTrash3Fill, BsTrashFill, BsX } from "react-icons/bs";
function createData(id, name, role) {
  return {
    id,
    name,
    role,
  };
}
const rows = [
  createData(1, "Khalid", "Announcement Admin"),
  createData(2, "Omar", "Reports Admin"),
  createData(3, "Abdullah", "Requests Admin"),
  createData(4, "Qasem", "Dashboard Admin"),
  createData(5, "Tawfeq", "Super Admin"),
  createData(6, "Osama", "Oraganizers Admin"),
  createData(7, "Waled", "Super Admin"),
  createData(8, "Waled", "Super Admin"),
  createData(9, "Waled", "Super Admin"),
  createData(10, "Waled", "Super Admin"),
  createData(11, "Waled", "Super Admin"),
  createData(12, "Waled", "Super Admin"),
  createData(13, "Waled", "Super Admin"),
  createData(14, "Waled", "Super Admin"),
  createData(15, "Waled", "Super Admin"),
  createData(16, "Waled", "Super Admin"),
  createData(17, "Waled", "Super Admin"),
  createData(18, "Waled", "Super Admin"),
  createData(19, "Waled", "Super Admin"),
  createData(20, "Waled", "Super Admin"),
  createData(21, "Waled", "Super Admin"),
  createData(22, "Waled", "Super Admin"),
  createData(23, "Waled", "Super Admin"),
  createData(24, "Waled", "Super Admin"),
  createData(25, "Waled", "Super Admin"),
  createData(26, "Waled", "Super Admin"),
];

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
    id: "id",
    numeric: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "role",
    numeric: false,
    label: "Role",
  },
];

const AdminsListHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell 
        key="actions" 
        align="right" 
        padding="normal" >

          Actions
          </TableCell> 
      </TableRow>
    </TableHead>
  );
};

AdminsListHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const AdminsList = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
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
          <AdminsListHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <TableRow
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell width={40} align="right">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="right">
                    <CustomButton 
                    name="Cancel Admin"
                    primary={false}
                    classes={styles['remove-admin-btn']}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default AdminsList;
