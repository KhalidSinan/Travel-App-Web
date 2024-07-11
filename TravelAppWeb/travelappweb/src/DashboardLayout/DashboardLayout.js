import React from "react";
import DashboardBar from "../DashboardBar/DashboardBar.js"
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar.js"



const DashboardLayout = (props) => {
    return (
        <React.Fragment>
            <DashboardBar />
            <DashboardSidebar />
        </React.Fragment>
    );
}


export default DashboardLayout;
