import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./Dashboard.module.css";

const TopCountries = ({ data = [] }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("count");
  const [view, setView] = useState("table");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleToggleView = () => {
    setView(view === "table" ? "chart" : "table");
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const barData = sortedData.map((item) => ({
    country: item.country,
    count: item.count,
  }));

  const pieData = sortedData.map((item) => ({
    name: item.country,
    value: item.count,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4040",
    "#C77CFF",
    "#7D8CC4",
    "#F5A623",
    "#50E3C2",
    "#FF69B4",
  ];

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleView}
        style={{ marginBottom: "20px" }}
      >
        {view === "table" ? "Switch to Chart View" : "Switch to Table"}
      </Button>

      {view === "table" ? (
        <TableContainer component={Paper} sx={{ marginBottom: "20px", backgroundColor: "var(--card-color)" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "country"}
                    direction={orderBy === "country" ? order : "asc"}
                    onClick={() => handleRequestSort("country")}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "count"}
                    direction={orderBy === "count" ? order : "asc"}
                    onClick={() => handleRequestSort("count")}
                  >
                    Count
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "lastMonthCount"}
                    direction={orderBy === "lastMonthCount" ? order : "asc"}
                    onClick={() => handleRequestSort("lastMonthCount")}
                  >
                    Last Month Count
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((row, index) => (
                <TableRow
                  key={row.country}
                  className={index === 0 ? styles["first-row"] : ""}
                >
                  <TableCell component="th" scope="row">
                    {row.country}
                  </TableCell>
                  <TableCell align="right">{row.count}</TableCell>
                  <TableCell align="right">{row.lastMonthCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              width: "400px",
              height: "400px",
              padding: "10px",
              boxSizing: "border-box",
              border: "2px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={140}
                innerRadius={90}
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#fff"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      {name}
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div
            style={{
              marginLeft: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BarChart
              width={800}
              height={400}
              data={barData}
              margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="country" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="rgba(75, 192, 192, 0.6)" />
            </BarChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCountries;
