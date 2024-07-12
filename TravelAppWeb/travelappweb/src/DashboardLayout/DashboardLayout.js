import React from "react";
import DashboardBar from "../DashboardBar/DashboardBar.js"
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar.js"
import { Outlet } from "react-router-dom";
import styles from './DashboardLayout.module.css';


const DashboardLayout = (props) => {
    return (
        <main className={styles['dashboard-layout']}>
            <DashboardBar />
            <DashboardSidebar />
            <main className={styles['dashboard-content']}>
                <Outlet />
            </main>
        </main>
    );
}


export default DashboardLayout;
