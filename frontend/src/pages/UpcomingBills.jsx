import React from "react";
import Sidebar from "../components/Sidebar";
import UpcomingBillsHeader from "../components/UpcomingBillsHeader";

const UpcomingBills = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <UpcomingBillsHeader />
            </div>
        </div>
    );
};

export default UpcomingBills;