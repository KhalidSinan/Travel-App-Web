import { useCallback, useContext, useState } from "react";
import React from "react";
import { AuthLogin } from "./login_context";

export const HotelsContext = React.createContext({
  hotels: [],
  getAllHotels: () => {},
  changePage: () => {},
  toggleSort: () => {},
  changeStars: (stars) => {},
  searchHotel: (hotelName) => {},
  isLoading: true,
  error: null,
  page: 1,
  count: 0,
  stars: "",
  sort: "",
  searchQuery: "",
});

const HotelsContextProvider = ({ children }) => {
  const { Token } = useContext(AuthLogin);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [stars, setStars] = useState("");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const getAllHotels = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/hotels?search=${searchQuery}&page=${page}&stars=${stars}&sort=${sort}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching hotels");
      }
      const data = await response.json();
      setCount(data.count);
      setHotels(data.data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [page,sort, stars, searchQuery, Token]);


  const toggleSort = () => {
    setSort(prev => prev === 'asc' ? 'desc' : 'asc');
  }

  const changeStars = (stars) => {
    setStars(stars);
  }

  const searchHotel = (hotelName) => {
    setSearchQuery(hotelName);
  } 

  const changePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const hotelContextValue = {
    hotels,
    getAllHotels,
    changePage,
    toggleSort,
    changeStars,
    searchHotel,
    isLoading,
    error,
    page,
    count,
    stars,
    sort,
    searchQuery,
  };

  return (
    <HotelsContext.Provider value={hotelContextValue}>
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsContextProvider;
