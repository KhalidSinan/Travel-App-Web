import styles from "./Admins.module.css";
import CustomButton from "../../helper/Components/CustomButton/CustomButton.js";
import AdminsList from "./AdminsList";
import { Link } from "react-router-dom";
import SearchBar from "../../helper/Components/SearchBar/SearchBar.js";
import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const Admins = (_) => {
  const [adminsList, setAdminsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');

  const getAllAdmins = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/dashboard/admins?limit=10&page=1',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OThjOTc2OGE5MzJkMjRiMDZmNTMzYyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjEyODk3NjZ9.Q35aHtM5xwtvC4vUBxPxcC62jzjL0OHhmmcwsgaFvBs`,
          },
        });
        if(!response.ok){
          throw new Error('An Error occured while fetching admins');
        }
        const data = await response.json();
        setAdminsList(data.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
  },[]);

  const searchAdmins = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/dashboard/admins/search?limit=10&page=1&username=${adminSearch}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OThjOTc2OGE5MzJkMjRiMDZmNTMzYyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjEyODk3NjZ9.Q35aHtM5xwtvC4vUBxPxcC62jzjL0OHhmmcwsgaFvBs`,
          },
        });
        if(!response.ok){
          throw new Error('An Error occured while fetching admins');
        }
        const data = await response.json();
        setAdminsList(data.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

  let content = <h3>No Admins Found</h3>;

  if(error){
    content = <h3>{error}</h3>
  }

  if(isLoading){
    content = <div className={styles.loading}><CircularProgress/></div>
  }

  if(adminsList.length > 0){
    content = <AdminsList admins={adminsList} />
  }

  useEffect(()=> {
    setTimeout(getAllAdmins, 1000);
  },[getAllAdmins]);

  return (
    <section className={styles["admins-section"]}>
      <header className={styles["admins-header"]}>
        <h1>Admins</h1>
        <div className={styles["admins-header-actions"]}>
          <Link to="/addAdmin">
            <CustomButton name="Add Admin" />
          </Link>
          <SearchBar  
          onSearchDone={searchAdmins}
          value={adminSearch} 
          onUpdateValue={(event) => setAdminSearch(event.target.value)} />
        </div>
      </header>
      <hr></hr>
      <section className={styles["admins-list"]}>
        {content}
      </section>
    </section>
  );
};

export default Admins;
