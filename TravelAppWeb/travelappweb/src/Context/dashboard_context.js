import React, { createContext, useState, useEffect, useContext } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTM4YzMxNzIyOWM3ZTA5NGFlODU4NyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjE5OTcwOTF9.GE7LOZf8uK0DJ9YM8_yttXvcMn5Saj-QwOmREg20O8I";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/dashboard/statistics/countries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const contextValue = { data };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// export const useDashboard = () => useContext(DashboardContext);

export default DashboardContext;
