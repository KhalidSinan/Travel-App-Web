import React, { createContext, useState, useEffect, useContext ,useCallback} from "react";
import { AuthLogin } from "./login_context";
import { baseUrl } from "../App";

const OrganizersContext = createContext();

export const OrganizersProvider = ({ children }) => {
  const {Token} = useContext(AuthLogin);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [cardsRequest, setAllCardsRequests] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  const fetchCards = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCards(data.data);
      setCount(data.count);
      setTotalItems(data.data.length);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const fetchorganizerAllRequest = useCallback(async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers-requests?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllCardsRequests(data.data);
      setTotalItems(data.totalItems);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchOrganizerDetails = useCallback(async (organizerId, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/${organizerId}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrganizerRequestDetails = useCallback(async (organizerId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers-requests/${organizerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrganizer = useCallback(async (organizerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/${organizerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete organizer");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting organizer:", error);
      throw error;
    }
  }, []);

  const deactiveOrganizer = useCallback(async (organizerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/${organizerId}/deactivate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to deactive organizer");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deactive organizer:", error);
      throw error;
    }
  }, []);

  const alertOrganizer = useCallback(async (organizerId, title, body) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/${organizerId}/alert`,
        {
          method: "POST",
          body: JSON.stringify({ title, body }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to alert organizer");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error alerting organizer:", error);
      throw error;
    }
  }, []);

  const acceptOrganizer = useCallback(async (organizerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers-requests/${organizerId}/accept`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Accept organizer");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error Accept organizer:", error);
      throw error;
    }
  }, []);

  const RefuseOrganizer = useCallback(async (organizerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers-requests/${organizerId}/deny`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Refuse organizer");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error Refuse organizer:", error);
      throw error;
    }
  }, []);

  const fetchTripDetails = useCallback(async (organizerId, tripId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/${organizerId}/trips/${tripId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChangePage = useCallback((value) => {
    setPage(value);
  }, []);

  const fetchSearchedOrganizers = useCallback(async (page, name) => {
    try {
      const response = await fetch(
        `${baseUrl}/dashboard/organizers/search?page=${page}&name=${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCards(data.data);
      setCount(data.count);
      setTotalItems(data.data.length);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <OrganizersContext.Provider
      value={{
        cards,
        totalItems,
        page,
        count,
        handleChangePage,
        setPage,
        fetchOrganizerDetails,
        deleteOrganizer,
        fetchTripDetails,
        fetchorganizerAllRequest,
        fetchOrganizerRequestDetails,
        fetchSearchedOrganizers,
        cardsRequest,
        deactiveOrganizer,
        alertOrganizer,
        acceptOrganizer,
        RefuseOrganizer,
        loading,
        error,
      }}
    >
      {children}
    </OrganizersContext.Provider>
  );
};

export default OrganizersContext;
