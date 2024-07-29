import React, { createContext, useState, useEffect } from "react";

<<<<<<< HEAD
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY0ODQ5MzliMTVjNmU5NTA4OGU0ZCIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjIyMDA2NzV9.nQ13xj0u4uOE3Ddp17dYRdObGGNBrytLC47MACSuKWQ";
=======
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTY3YzkxMzhiMDk0ODBlZWE5N2NhNCIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjIxODY5NTB9.9GxtSU2UfaKVwkzYMPAB0_DZW_EfrLTfSdhH8EFqM_s";
>>>>>>> c9fcd6dc148cd404ae84995b0b13acedf0416e18

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [AllCountries, setAllCountries] = useState(null);
  const [organizedTripsPer, setOrganizedTripsPer] = useState(null);
  const [topHotels, setTopHotels] = useState(null);
<<<<<<< HEAD
  const [airlines, setAirlines] = useState(null);
  const [topCountries, setTopCountries] = useState(null); // Add state for topCountries

=======
  const [hotels, setHotels] = useState(null);
>>>>>>> c9fcd6dc148cd404ae84995b0b13acedf0416e18
  useEffect(() => {
    const fetchAllCountries = async () => {
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
        setAllCountries(result); // Set the correct state
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
            "An error occurred while fetching organized trips percentage"
          );
        }
        const data = await response.json();
        setOrganizedTripsPer(data);
      } catch (error) {
        console.log('Fetch Error', error.message);
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
            "An error occurred while fetching top hotels"
          );
        }
        const data = await response.json();
        setTopHotels(data.data);
      } catch (error) {
        console.log('Fetch Error', error.message);
      }
    };
<<<<<<< HEAD

    const fetchAirlines = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/statistics/airline-flights",
=======
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/hotels?page=1",
>>>>>>> c9fcd6dc148cd404ae84995b0b13acedf0416e18
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
<<<<<<< HEAD
          throw new Error("An error occurred while fetching airlines data");
        }
        const data = await response.json();
        setAirlines(data);
      } catch (error) {
        console.log('Fetch Error', error.message);
      }
    };

    // Add fetch function for topCountries
    const fetchTopCountries = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/statistics/top-countries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An error occurred while fetching top countries data");
        }
        const data = await response.json();
        setTopCountries(data);
      } catch (error) {
        console.log('Fetch Error', error.message);
      }
    };

=======
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
>>>>>>> c9fcd6dc148cd404ae84995b0b13acedf0416e18
    fetchOrganizedTripsPer();
    fetchHotels();
    fetchTopHotels();
    fetchAllCountries(); 
    fetchAirlines();
    fetchTopCountries(); 

  }, []);

<<<<<<< HEAD
  const contextValue = { AllCountries, organizedTripsPer, topHotels, airlines, topCountries };
=======
  const contextValue = { topCountries, organizedTripsPer, topHotels, hotels };
>>>>>>> c9fcd6dc148cd404ae84995b0b13acedf0416e18

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
