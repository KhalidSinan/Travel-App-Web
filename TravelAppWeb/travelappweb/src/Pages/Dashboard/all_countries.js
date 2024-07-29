import React, { useState } from "react";
import ReusableTable from "./FlightStates/reusable_table";

const TopCountries = ({ data = [] }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("count");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <ReusableTable
        data={sortedData}
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
    </div>
  );
};

export default TopCountries;
