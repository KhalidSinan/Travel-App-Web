import React, { useContext } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import DashboardContext from "../../Context/dashboard_context";
import styles from "./Dashboard.module.css";
import TopCountries from "./top_10_countries";
import { CircularProgress } from "@mui/material";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsArrowRightShort } from "react-icons/bs";
import HotelsList from "../Hotels/HotelsStats/HotelsStats";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { topCountries, organizedTripsPer, topHotels, hotels } =
    useContext(DashboardContext);
  return (
    <main className={styles["statistics-section"]}>
      <section className={styles["general-statistics"]}>
        <div
          className={`${styles["statistics-card"]} ${styles["profit-stats"]}`}
        >
          <h2>JourneyJoy's Profits:</h2>
          <LineChart
            colors={["var(--primary-color)"]}
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
          />
        </div>
        <div
          className={`${styles["statistics-card"]} ${styles["organized-percentage-stats"]}`}
        >
          <h2>Organized Trips Percentage:</h2>
          {organizedTripsPer ? (
            <PieChart
              series={[
                {
                  data: [
                    {
                      label: "Organized",
                      value: organizedTripsPer.organizedTripsCount,
                    },
                    {
                      label: "Not Organized",
                      value: organizedTripsPer.tripsCount,
                    },
                  ],
                  innerRadius: 60,
                  paddingAngle: 4,
                  cornerRadius: 5,
                },
              ]}
              margin={{ bottom: 0, left: 0, top: 0, right: 0 }}
              colors={["var(--primary-color)", "var(--date-color)"]}
              slotProps={{
                legend: { hidden: true },
              }}
              height={180}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </section>
      <section className={styles["specific-statistics"]}>
        <section className={styles["hotels-statistics"]}>
          <div
            className={`${styles["statistics-card"]} ${styles["hotels-list"]}`}
          >
            <div className={styles["hotels-list-header"]}>
              <h2>JourneyJoy's Hotels:</h2>
              <Link to={"/hotels"}>
                <CustomIconButton
                  icon={
                    <BsArrowRightShort
                      color="var(--secondary-color)"
                      size={32}
                    />
                  }
                />
              </Link>
            </div>
            {hotels ? <HotelsList hotels={hotels} /> : <CircularProgress />}
          </div>
          <div
            className={`${styles["statistics-card"]} ${styles["hotels-stats"]}`}
          >
            <h2>JourneyJoy's Top 10 Hotels:</h2>
            {topHotels ? (
              <BarChart
                colors={["var(--primary-color)"]}
                yAxis={[
                  {
                    scaleType: "band",
                    data: topHotels.map((hotel) => hotel.name),
                  },
                ]}
                margin={{ top: 20 }}
                layout="horizontal"
                grid={{ vertical: true }}
                series={[
                  { data: topHotels.map((hotel) => hotel.reservationCount) },
                ]}
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </section>
        <section className={styles["countries-statistics"]}></section>
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

// <PieChart
//           series={[
//             {
//               data: pieData,
//               faded: {
//                 innerRadius: 30,
//                 additionalRadius: -30,
//               },
//             },
//           ]}
//           slotProps={{
//             legend: { hidden: true },
//           }}
//         />
//         <PieChart
//           series={[
//             {
//               data: pieData,
//               faded: {
//                 innerRadius: 30,
//                 additionalRadius: -30,
//               },
//             },
//           ]}
//           slotProps={{
//             legend: { hidden: true },
//           }}
//         />
//         <LineChart
//           xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//           series={[
//             {
//               data: [2, 5.5, 2, 8.5, 1.5, 5],
//             },
//           ]}
//         />
