import React from "react";
import Sidebar from "../components/Sidebar";
import SavingGoalsHeader from "../components/SavingGoalsHeader";

const SavingGoals = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <SavingGoalsHeader />
            </div>
        </div>
    );
};

export default SavingGoals;