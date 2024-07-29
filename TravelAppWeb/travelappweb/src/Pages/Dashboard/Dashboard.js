import React, { useContext } from "react";
import DashboardContext from "../../Context/dashboard_context";
import styles from "./Dashboard.module.css";
import TopCountries from "./all_countries";
import HotelsList from "./HotelsStats/HotelsStats";
import { CircularProgress } from "@mui/material";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsArrowRightShort } from "react-icons/bs";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";
import ViewTopCountries from "./FlightStates/view_top_countries"; 

const Dashboard = () => {
  const { topCountries, organizedTripsPer, topHotels, airlines, AllCountries } = useContext(DashboardContext);

  return (
    <main className={styles["statistics-section"]}>
      <section className={styles["general-statistics"]}>
        <div className={`${styles["statistics-card"]} ${styles["profit-stats"]}`}>
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
        <div className={`${styles["statistics-card"]} ${styles["organized-percentage-stats"]}`}>
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
          <div className={`${styles["statistics-card"]} ${styles["hotels-list"]}`}>
            <div className={styles["hotels-list-header"]}>
              <h2>JourneyJoy's Hotels:</h2>
              <CustomIconButton
                icon={
                  <BsArrowRightShort color="var(--primary-color)" size={32} />
                }
              />
            </div>
            {topHotels ? (
              <HotelsList hotels={topHotels} />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className={`${styles["statistics-card"]} ${styles["hotels-stats"]}`}>
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
        <section className={styles["tall-statistics-cardTopCountries"]}>
          <div className={`${styles["statistics-card"]} ${styles["tall-statistics-card"]}`}>
            <h2>JourneyJoy's Top Countries:</h2>
            {topCountries ? (
              <ViewTopCountries data={topCountries.data} /> 
            ) : (
              <CircularProgress />
            )}
          </div>
        </section>
        <section className={styles["countries-airlines-statistics"]}>
          <div className={`${styles["statistics-card"]} ${styles["tall-statistics-card"]}`}>
            <h2>JourneyJoy's All Countries:</h2>
            {AllCountries ? (
              <TopCountries data={AllCountries.data} />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div className={`${styles["statistics-card"]} ${styles["tall-statistics-cardAirlines"]}`}>
            <h2>JourneyJoy's All Airlines:</h2>
            {airlines ? (
              <TopCountries data={airlines.data} />
            ) : (
              <CircularProgress />
            )}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
