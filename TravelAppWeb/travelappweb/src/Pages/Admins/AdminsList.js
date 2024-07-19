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
import CustomButton from "../../helper/Components/CustomButton/CustomButton.js";
import styles from "./AdminsList.module.css";
import { styled } from "@mui/material/styles";
import CancelAdminDialog from "./CancelAdminDialog.js";
import AutohideSnackbar from "../../helper/snackbar.js";

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
  {
    id: "created_at",
    numeric: false,
    label: "Created At",
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
        {/* <StyledTableCell key="actions" align="left" padding="normal">
          Created At
        </StyledTableCell> */}
        <StyledTableCell key="actions" align="right" padding="normal">
          Actions
        </StyledTableCell>
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

const AdminsList = ({ admins }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [cancelAdmin, setCancelAdmin] = React.useState({
    openDialog: false,
    admin: null,
    success: false,
  });

  const openCancelAdminDialog = (admin) =>
    setCancelAdmin({ openDialog: true, admin, success: false });

  const closeCancelAdminDialog = () =>
    setCancelAdmin({ openDialog: false, admin: null, success: false });

  const onCancelSuccess = (admin) => {
    setCancelAdmin({ openDialog: false, admin, success: true });
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admins.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(admins, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <React.Fragment>
      <CancelAdminDialog
        open={cancelAdmin.openDialog}
        admin={cancelAdmin.admin}
        onClose={closeCancelAdminDialog}
        onCancelSuccess={() => onCancelSuccess(cancelAdmin.admin)}
      />
      {cancelAdmin.success ? <AutohideSnackbar message={`${cancelAdmin.admin.username} canceled successfully`} /> : null}
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
            rowCount={admins.length}
          />
          <TableBody>
            {visibleRows.map((admin, index) => {
              return (
                <TableRow tabIndex={-1} key={admin.id}>
                  <StyledTableCell width={40} align="right">
                    {admin['id'].substring(0, 9)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {admin.username}
                  </StyledTableCell>
                  <StyledTableCell align="left">{admin.role}</StyledTableCell>
                  <StyledTableCell align="left">
                    {new Date(admin.created_at).toLocaleString("en-US")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <CustomButton
                      onClick={() => openCancelAdminDialog(admin)}
                      name="Cancel Admin"
                      primary={false}
                      classes={styles["remove-admin-btn"]}
                    />
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
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={admins.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default AdminsList;
