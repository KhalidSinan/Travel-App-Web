import React, { createContext, useState, useEffect, useContext } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY3YzkxMzhiMDk0ODBlZWE5N2NhNCIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjIxODY5NTB9.9GxtSU2UfaKVwkzYMPAB0_DZW_EfrLTfSdhH8EFqM_s";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [topCountries, setTopCountries] = useState(null);
  const [organizedTripsPer, setOrganizedTripsPer] = useState(null);
  const [topHotels, setTopHotels] = useState(null);
  const [hotels, setHotels] = useState(null);
  useEffect(() => {
    const fetchTopCountries = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/statistics/countries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setTopCountries(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    const fetchOrganizedTripsPer = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/statistics/organized-percentage",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "An erro Occur while fetching organized trips percentage"
          );
        }
        const data = await response.json();
        setOrganizedTripsPer(data);
      } catch (error) {
        console.log('Fetch Error',error.message);
      }
    };

    const fetchTopHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/statistics/top-hotels",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "An erro Occur while fetching top hotels"
          );
        }
        const data = await response.json();
        setTopHotels(data.data);
      } catch (error) {
        console.log('Fetch Error',error.message);
      }
    };
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/hotels?page=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "An erro Occur while fetching top hotels"
          );
        }
        const data = await response.json();
        setHotels(data.data);
      } catch (error) {
        console.log('Fetch Error',error.message);
      }
    };
    fetchOrganizedTripsPer();
    fetchHotels();
    fetchTopHotels();
    fetchTopCountries();
  }, []);

  const contextValue = { topCountries, organizedTripsPer, topHotels, hotels };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// export const useDashboard = () => useContext(DashboardContext);

export default DashboardContext;
