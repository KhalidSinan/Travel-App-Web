import React from "react";
import DashboardBar from "../DashboardBar/DashboardBar"
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar"




const DashboardLayout = (props) => {
    return (
        <React.Fragment>
            <DashboardBar />
            <DashboardSidebar />
        </React.Fragment>
    );
}


export default DashboardLayout;
