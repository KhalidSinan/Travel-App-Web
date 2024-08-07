import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthLogin } from "./login_context";


const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const {Token} = useContext(AuthLogin);
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
            Authorization: `Bearer ${Token}`,
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
            Authorization: `Bearer ${Token}`,
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
            Authorization: `Bearer ${Token}`,
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
            Authorization: `Bearer ${Token}`,
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
