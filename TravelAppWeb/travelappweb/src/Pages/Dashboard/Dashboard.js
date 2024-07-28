import React, { useContext } from "react";
import { BarChart, pieArcLabelClasses, PieChart } from "@mui/x-charts";
import DashboardContext from "../../Context/dashboard_context";
import styles from "./Dashboard.module.css";
import TopCountries from "./top_10_countries";

const pieData = [
  { label: "Organized", value: 40, color: "var(--primary-color)" },
  { label: "Not Organized", value: 13, color: "grey" },
];

const Dashboard = () => {
  const { topCountries } = useContext(DashboardContext);
  return (
    <main className={styles["statistics-section"]}>
      <header className={styles["general-statistics"]}>
      </header>
      <section className={styles["specific-statistics"]}>
        <section className={styles["hotels-statistics"]}>
        </section>
        <section className={styles["countries-statistics"]}>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;

{
  /* <BarChart
          yAxis={[
            {
              scaleType: "band",
              data: [
                "khalid1",
                "khalid2",
                "khalid3",
                "khalid4",
                "khalid5",
                "khalid6",
                "khalid7",
                "khalid8",
                "khalid9",
                "khalid10",
              ],
            },
          ]}
          leftAxis={{
            fill: "white"
          }}
          xAxis={[
            {
              label: "Top 10 Hotels",
            },
          ]}
          layout="horizontal"
          grid={{ vertical: true }}
          series={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
        /> */
}

{
  /* <PieChart
            series={[
              {
                data: pieData,
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                },
              },
            ]}
            slotProps={{
              legend: {hidden: true}
            }}
            height={200}
          /> */
}

{
  /* {topCountries ? (
        <TopCountries data={topCountries.data} />
      ) : (
        <p>Loading...</p>
      )} */
}
