import React from "react";
import { Outlet } from "react-router-dom";
import styles from './DashboardLayout.module.css';
import DashboardBar from "../DashboardBar/DashboardBar";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";


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
