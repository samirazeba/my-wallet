import React from "react";
import Sidebar from "../components/Sidebar";
import AllUsers from "../components/AllUsers";
import DashboardHeader from "../components/DashboardHeader";


const Home = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <DashboardHeader />
            </div>
        </div>
    );
};

export default Home;