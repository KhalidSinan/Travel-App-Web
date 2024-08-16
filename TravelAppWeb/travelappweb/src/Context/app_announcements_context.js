import { useCallback, useContext, useState } from "react";
import React from "react";
import { AuthLogin } from "./login_context";
import { format } from "date-fns";
import { baseUrl } from "../App";
import axios from "axios";

export const AppAnnouncementsContext = React.createContext({
  announcements: [],
  getAllAppAnnouncements: () => {},
  changePage: () => {},
  toggleSort: () => {},
  changeStartDate: (newDate) => {},
  changeEndDate: (newDate) => {},
  isLoading: true,
  error: null,
  page: 1,
  count: 0,
  sort: "",
  startDate: "",
  endDate: "",
});

const AppAnnouncementsContextProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log("============");
  console.log(announcements, error);
  const getAllAppAnnouncements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let formattedStartDate = "";
    let formattedEndDate = "";
    if (startDate && endDate) {
      formattedStartDate = format(startDate, "dd/MM/yyyy");
      formattedEndDate = format(endDate, "dd/MM/yyyy");
    }
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/announcements/app?page=${page}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&sort=${sort}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching announcements");
      }
      const data = await response.json();
      setCount(data.count);
      setAnnouncements(data.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [page, sort, startDate, endDate, Token]);

  const toggleSort = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const changeStartDate = (newDate) => {
    setStartDate(newDate);
  };

  const changeEndDate = (newDate) => {
    setEndDate(newDate);
  };
  const changePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const announcementsContextValue = {
    announcements,
    getAllAppAnnouncements,
    changePage,
    toggleSort,
    changeStartDate,
    changeEndDate,
    isLoading,
    error,
    page,
    count,
    sort,
    startDate,
    endDate,
  };

  return (
    <AppAnnouncementsContext.Provider value={announcementsContextValue}>
      {children}
    </AppAnnouncementsContext.Provider>
  );
};

export default AppAnnouncementsContextProvider;
