import { useCallback, useContext, useEffect, useState } from "react";
import NotificationsList from "./NotificationsList/NotificationsList";
import styles from "./NotificationsPage.module.css";
import { CircularProgress, Grid, TextField } from "@mui/material";
import CustomButton from "../../helper/Components/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { AuthLogin } from "../../Context/login_context";
import { NotificationsContext } from "../../Context/notifications_context";
import CustomPagination from "../../helper/custom_pagination";
import DateFilter from "../../helper/Components/DateFilter/date_filter";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import CustomTextField from "../../helper/Components/CustomTextField/CustomTextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TextFieldStyle from "../../helper/Styles/TextFieldStyle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NotificationsFilter from "./NotificationsFilter/NotificationsFilter";
const NotificationsPage = () => {
  const {
    notifications,
    getAllNotifications,
    changePage,
    toggleSort,
    isLoading,
    error,
    page,
    count,
    sort,
  } = useContext(NotificationsContext);

  const [showFilter, setShowFilter] = useState(false);

  const toggleShowFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
     getAllNotifications();
  }, [getAllNotifications]);

  let content = <h2>No Notifications Found</h2>;

  if (error) {
    content = <h2>{error}</h2>;
  }

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (notifications.length > 0) {
    content = (
      <>
        <NotificationsList notifications={notifications} />
        {Math.ceil(count/10) > 1 ? (
          <CustomPagination
            count={Math.ceil(count / 10)}
            page={page}
            onChange={(event, page) => changePage(event, page)}
          />
        ) : null}
      </>
    );
  }

  return (
    <section className={styles["notifications-section"]}>
      <header className={styles["notifications-header"]}>
        <h1>Notifications</h1>
        <div className={styles["notifications-options"]}>
          <CustomIconButton
            icon={<BsFilter />}
            text="Filter"
            classes={`${showFilter ? styles["filter-active"] : ""} ${
              styles["option-btn"]
            }`}
            onClick={toggleShowFilter}
          />
          <CustomIconButton
            icon={sort === "desc" ? <BsSortUp /> : <BsSortDown />}
            text="Sort"
            onClick={toggleSort}
            classes={`${styles["option-btn"]}`}
          />
          <Link to="/pushNotification">
            <CustomButton name="Push Notification" />
          </Link>
        </div>
      </header>
      <hr></hr>
      <section className={styles["notifications-content"]}>
        <NotificationsFilter showFilter={showFilter} />
        {content}
      </section>
    </section>
  );
};

export default NotificationsPage;
