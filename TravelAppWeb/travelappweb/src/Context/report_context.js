import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthLogin } from "./login_context";
import { baseUrl } from "../App";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [dataOrganizer, setOrganizerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const fetchData = async (page, startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/dashboard/reports/app?page=${page}&start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "ngrok-skip-browser-warning": "69420",

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

  const fetchDataOrganizer = async (page, startDate, endDate, searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/dashboard/reports/organizers?page=${page}&start_date=${startDate}&end_date=${endDate}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "ngrok-skip-browser-warning": "69420",

          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setOrganizerData(result.data);
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
        `${baseUrl}/dashboard/reports/${id}/reply`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Token}`,
            "ngrok-skip-browser-warning": "69420",

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
    fetchData(page, startDate, endDate);
  }, [page, startDate, endDate]);

  const handleChangePage = (value) => {
    setPage(value);
  };

  const deleteReport = async (id) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/reports/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Token}`,
            "ngrok-skip-browser-warning": "69420",

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
    startDate,
    endDate,
    searchQuery,
    handleChangePage,
    handleStartDateChange: setStartDate,
    handleEndDateChange: setEndDate,
    handleSearchQueryChange: setSearchQuery,
    data,
    dataOrganizer,
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
