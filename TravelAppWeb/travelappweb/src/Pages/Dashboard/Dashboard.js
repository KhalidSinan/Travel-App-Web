import { PieChart } from "@mui/x-charts";
import styles from './Dashboard.module.css';
const data = [
  { label: "Male", value: 400, color: "cyan" },
  { label: "Female", value: 300, color: "purple" },
];

const Dashboard = (props) => {
  return (
    <div className={styles['dashboard-statistics']}>
      <PieChart
        series={[
          {
            innerRadius: 30,
            cornerRadius: 5,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "grey" },
            data,
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
  );
};

export default Dashboard;
