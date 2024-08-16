import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthLogin } from "./login_context";
import { baseUrl } from "../App";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [AllCountries, setAllCountries] = useState(null);
  const [organizedTripsPer, setOrganizedTripsPer] = useState(null);
  const [topHotels, setTopHotels] = useState(null);
  const [airlines, setAirlines] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [topCountries, setTopCountries] = useState(null); // Add state for topCountries
  const [revenues, setRevenue] = useState(null); // Add state for topCountries

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/revenue`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRevenue(result.data); // Set the correct state
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    const fetchAllCountries = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/countries`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setAllCountries(result); // Set the correct state
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchOrganizedTripsPer = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/organized-percentage`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "An error occurred while fetching organized trips percentage"
          );
        }
        const data = await response.json();
        setOrganizedTripsPer(data);
      } catch (error) {
        console.log("Fetch Error", error.message);
      }
    };

    const fetchTopHotels = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/top-hotels`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching top hotels");
        }
        const data = await response.json();
        setTopHotels(data.data);
      } catch (error) {
        console.log("Fetch Error", error.message);
      }
    };

    const fetchAirlines = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/airline-flights`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching airlines data");
        }
        const data = await response.json();
        setAirlines(data);
      } catch (error) {
        console.log("Fetch Error", error.message);
      }
    };

    // Add fetch function for topCountries
    const fetchTopCountries = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/statistics/top-countries`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "An error occurred while fetching top countries data"
          );
        }
        const data = await response.json();
        setTopCountries(data);
      } catch (error) {
        console.log("Fetch Error", error.message);
      }
    };
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/dashboard/hotels?page=1`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An erro Occur while fetching top hotels");
        }
        const data = await response.json();
        setHotels(data.data);
      } catch (error) {
        console.log("Fetch Error", error.message);
      }
    };
    fetchRevenue();
    fetchOrganizedTripsPer();
    fetchHotels();
    fetchTopHotels();
    fetchAllCountries();
    fetchAirlines();
    fetchTopCountries();
  }, []);

  const contextValue = {
    AllCountries,
    organizedTripsPer,
    topHotels,
    airlines,
    topCountries,
    hotels,
    revenues,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
