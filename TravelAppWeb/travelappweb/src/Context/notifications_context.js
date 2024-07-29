import { useCallback, useContext, useState } from "react";
import React from "react";
import { AuthLogin } from "./login_context";
import { format } from "date-fns";

export const NotificationsContext = React.createContext({
  notifications: [],
  getAllNotifications: () => {},
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

const NotificationsContextProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getAllNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let formattedStartDate = "";
    let formattedEndDate = "";
    if (startDate && endDate) {
      formattedStartDate = format(startDate, "dd/MM/yyyy");
      formattedEndDate = format(endDate, "dd/MM/yyyy");
    }
    console.log(formattedStartDate,formattedEndDate, startDate, endDate);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/notifications/?page=${page}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&sort=${sort}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching notifications");
      }
      const data = await response.json();
      const notifications = [];
      for (let index in data.data) {
        const {
          id,
          notification_title: title,
          notification_body: content,
          created_at: createdAt,
        } = data.data[index];
        notifications.push({
          id,
          title,
          content,
          createdAt,
        });
      }
      setCount(data.count);
      setNotifications(notifications);
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

  const notificationsContextValue = {
    notifications,
    getAllNotifications,
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
    <NotificationsContext.Provider value={notificationsContextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;
