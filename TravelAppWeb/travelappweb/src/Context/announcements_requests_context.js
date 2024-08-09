import { useCallback, useContext, useState } from "react";
import React from "react";
import { AuthLogin } from "./login_context";
import { format } from "date-fns";

export const AnnouncementsRequestsContext = React.createContext({
  requests: [],
  getAllAnnouncementsRequests: () => {},
  changePage: () => {},
  toggleSort: () => {},
  changeStartDate: (newDate) => {},
  changeEndDate: (newDate) => {},
  onAcceptDialogOpen: () => {},
  onAcceptDialogClose: () => {},
  onDenyDialogOpen: () => {},
  onDenyDialogClose: () => {},
  onAcceptAnnouncement: () => {},
  onDenyAnnouncement: () => {},
  isLoading: true,
  error: null,
  page: 1,
  count: 0,
  sort: "",
  startDate: "",
  endDate: "",
});

const AnnouncementsRequestsContextProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [acceptDialogOpen, setAcceptDialogOpen] = useState({
    open: false,
    announce: null,
  });
  const [denyDialogOpen, setDenyDialogOpen] = useState({
    open: false,
    announce: null,
  });

  const getAllAnnouncementsRequests = useCallback(async () => {
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
        `http://localhost:5000/dashboard/announcement-requests?page=${page}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&sort=${sort}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching requests");
      }
      const data = await response.json();
      const announcementsRequests = [];
      for (let index in data.data) {
        const {
          id,
          announcement_title: title,
          announcement_body: content,
          organizer_name,
          organizer_id,
          organized_trip_id,
          locationOfAnnouncement,
          num_of_days: numOfDays,
          created_at,
        } = data.data[index];
        announcementsRequests.push({
          id,
          title,
          content,
          created_at,
          organizer_name,
          organizer_id,
          organized_trip_id,
          locationOfAnnouncement,
          numOfDays
        });
      }
      setCount(data.count);
      setRequests(announcementsRequests);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [page, sort, startDate, endDate, Token]);

  const onAcceptDialogOpen = (announce) => {
    setAcceptDialogOpen({ open: true, announce });
  };

  const onAcceptDialogClose = () => {
    setAcceptDialogOpen({ open: false, announce: null });
  };

  const onDenyDialogOpen = (announce) => {
    setDenyDialogOpen({ open: true, announce });
  };

  const onDenyDialogClose = () => {
    setDenyDialogOpen({ open: false, announce: null });
  };

  const onAcceptAnnouncement = () => {
    const newRequests = requests.filter(
      (request) => request.id !== acceptDialogOpen.announce.id
    );
    setRequests(newRequests);
    onAcceptDialogClose();
  };

  const onDenyAnnouncement = () => {
    const newRequests = requests.filter(
      (request) => request.id !== denyDialogOpen.announce.id
    );
    setRequests(newRequests);
    onDenyDialogClose();
  };

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
    requests,
    getAllAnnouncementsRequests,
    changePage,
    toggleSort,
    changeStartDate,
    changeEndDate,
    onAcceptDialogOpen,
    onAcceptDialogClose,
    onDenyDialogOpen,
    onDenyDialogClose,
    onAcceptAnnouncement,
    onDenyAnnouncement,
    acceptDialogOpen,
    denyDialogOpen,
    isLoading,
    error,
    page,
    count,
    sort,
    startDate,
    endDate,
  };

  return (
    <AnnouncementsRequestsContext.Provider value={announcementsContextValue}>
      {children}
    </AnnouncementsRequestsContext.Provider>
  );
};

export default AnnouncementsRequestsContextProvider;
