import React, { useContext } from "react";
import DashboardContext from "../../Context/dashboard_context";
import styles from "./Dashboard.module.css";
import TopCountries from "./all_countries";
import HotelsList from "../Hotels/HotelsList/HotelsList";
import { CircularProgress } from "@mui/material";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsArrowRightShort } from "react-icons/bs";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";
import ViewTopCountries from "./FlightStates/view_top_countries";
import { Link } from "react-router-dom";
import HotelsTable from "../Hotels/HotelsTable/HotelsTable";
const Dashboard = () => {
  const {
    topCountries,
    organizedTripsPer,
    topHotels,
    airlines,
    AllCountries,
    hotels,
    revenues,
  } = useContext(DashboardContext);

  let months = [];
  let revenue = [];
  if (revenues) {
    months = revenues.map((revenue,index) => index+1);
    revenue = revenues.map((revenue) => revenue.revenue);
    console.log(months)
    console.log(revenue)
  }
  return (
    <main className={styles["statistics-section"]}>
      <section className={styles["general-statistics"]}>
        <div
          className={`${styles["statistics-card"]} ${styles["profit-stats"]}`}
        >
          <h2>JourneyJoy's Profits:</h2>
          {months ? <LineChart
            colors={["var(--primary-color)"]}
            xAxis={[{ data: months,label: "Month" }]}
            series={[
              {
                data: revenue,
              },
            ]}
          /> : <CircularProgress />}
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
            {hotels ? <HotelsTable hotels={hotels} /> : <CircularProgress />}
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
        <section className={styles["tall-statistics-cardTopCountries"]}>
          <div
            className={`${styles["statistics-card"]} ${styles["tall-statistics-card"]}`}
          >
            <h2>JourneyJoy's Top Countries:</h2>
            {/* {topCountries ? (
              <ViewTopCountries data={topCountries.data} />
            ) : (
              <CircularProgress />
            )} */}
          </div>
        </section>
        <section className={styles["countries-airlines-statistics"]}>
          <div
            className={`${styles["statistics-card"]} ${styles["tall-statistics-cardAllCountries"]}`}
          >
            <h2>JourneyJoy's All Countries:</h2>
            {AllCountries ? (
              <TopCountries data={AllCountries.data} />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div
            className={`${styles["statistics-card"]} ${styles["tall-statistics-cardAirlines"]}`}
          >
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
