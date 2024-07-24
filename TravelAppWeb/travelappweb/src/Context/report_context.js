import React, { createContext, useState, useEffect } from "react";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTM4YzMxNzIyOWM3ZTA5NGFlODU4NyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjE3Njc3NTB9.ezZS6AGnJMJlTzYyAMz1EXHnMAd4Yzmjdnq7iugBmKc";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const fetchData = async (page, startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/reports/app?page=${page}&start_date=${startDate}&end_date=${endDate}`,
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
      setData(result.data);
      setCount(result.count);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataOrganizer = async (page, startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/reports/organizers?page=${page}&start_date=${startDate}&end_date=${endDate}`,
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
      setData(result.data);
      setCount(result.count);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReply = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/reports/${id}/reply`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the reply");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchData(page, start_date, end_date);
  }, [page, start_date, end_date]);

  const handleChangePage = (value) => {
    setPage(value);
  };

  const deleteReport = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/reports/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the report");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const contextValue = {
    page,
    start_date,
    end_date,
    handleChangePage,
    handleStartDateChange: setStartDate,
    handleEndDateChange: setEndDate,
    data,
    count,
    loading,
    error,
    fetchData,
    fetchReply,
    deleteReport,
    fetchDataOrganizer,
  };

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};

export default ReportContext;
