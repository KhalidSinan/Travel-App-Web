import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Legend, Cell, LabelList } from 'recharts';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: 'white',
    fontSize: '1rem',
  },
  [`&.${tableCellClasses.body}`]: {
    color: 'white',
    fontSize: '0.875rem',
  },
}));

const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '&.Mui-active': {
    color: 'white',
  },
  '& .MuiTableSortLabel-icon': {
    color: 'white !important',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#ffb156",
}));

const ViewTopCountries = ({ data }) => {
  const [view, setView] = useState('table');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <main style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => handleViewChange('table')}>Table View</button>
        <button onClick={() => handleViewChange('bar')}>Bar Chart</button>
        <button onClick={() => handleViewChange('pie')}>Pie Chart</button>
      </div>

      {view === 'table' ? (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: 2,
            marginBottom: 2,
            backgroundColor: "var(--card-color)",
          }}
        >
          <Table>
            <TableHead>
              <StyledTableRow>
                {Object.keys(data[0]).map((key) => (
                  <StyledTableCell key={key}>
                    <StyledTableSortLabel>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </StyledTableSortLabel>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.keys(row).map((key, idx) => (
                    <StyledTableCell key={idx}>
                      {key === 'logo' ? (
                        <img src={row[key]} alt={row['name']} style={{ height: 40 }} />
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={5}
            page={0}
          />
        </TableContainer>
      ) : view === 'bar' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <BarChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="country" 
              label={{ value: 'Country', position: 'insideBottomRight', offset: 0 }} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={80}
            />
            <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={40}>
              <LabelList dataKey="country" position="top" />
            </Bar>
          </BarChart>
        </div>
      ) : view === 'pie' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="country"
              outerRadius={200}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, count } = payload[0].payload;
                  return (
                    <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                      <p>{name}</p>
                      <p>Count: {count}</p>
                    </div>
                  );
                }
                return null;
              }} 
            />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ViewTopCountries;
