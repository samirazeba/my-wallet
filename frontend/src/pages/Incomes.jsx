import React from "react";
import Sidebar from "../components/Sidebar";
import IncomesHeader from "../components/IncomesHeader";

const Incomes = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <IncomesHeader />
            </div>
        </div>
    );
};

export default Incomes;