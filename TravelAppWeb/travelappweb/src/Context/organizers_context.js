import React, { createContext, useState, useEffect } from "react";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OThjOTc2OGE5MzJkMjRiMDZmNTMzYyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjEyODk3NjZ9.Q35aHtM5xwtvC4vUBxPxcC62jzjL0OHhmmcwsgaFvBs";
const OrganizersContext = createContext();

export const OrganizersProvider = ({ children }) => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [cardsRequest, setAllCardsRequests] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

 


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/dashboard/organizers?page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
    };

    fetchCards();
  }, [page]);

  const fetchorganizerAllRequest = async (page) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers-requests?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const fetchOrganizerDetails = async (organizerId, page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers/${organizerId}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  /////////////////////////////////////////
  const fetchOrganizerRequestDetails = async (organizerId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers-requests/${organizerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const deleteOrganizer = async (organizerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers/${organizerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const deactiveOrganizer = async (organizerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers/${organizerId}/deactivate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };
  const alertOrganizer = async (organizerId, title, body) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers/${organizerId}/alert`,
        {
          method: "POST",
          body: JSON.stringify({ title, body }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const acceptOrganizer = async (organizerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers-requests/${organizerId}/accept`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const RefuseOrganizer = async (organizerId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers-requests/${organizerId}/deny`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const fetchTripDetails = async (organizerId, tripId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/organizers/${organizerId}/trips/${tripId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
  };

  const handleChangePage = (value) => {
    setPage(value);
  };

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