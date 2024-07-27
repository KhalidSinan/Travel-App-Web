import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts";
import DashboardContext from "../../Context/dashboard_context";
import styles from './Dashboard.module.css';
import TopCountries from "./top_10_countries";


const pieData = [
  { label: "Male", value: 400, color: "cyan" },
  { label: "Female", value: 300, color: "purple" },
];

const Dashboard = () => {
  const { data } = useContext(DashboardContext);

  return (
    <div>
      <div className={styles['dashboard-statistics']}>
        <PieChart
          series={[
            {
              innerRadius: 30,
              cornerRadius: 5,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "grey" },
              data: pieData,
            },
          ]}
          slotProps={{
            legend: { hidden: true },
          }}
          width={500}
        />
        <div></div>
        <div></div>
      </div>
      {data ? <TopCountries data={data.data} /> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
