import React from "react";
import Sidebar from "../components/Sidebar";
import ExpensesHeader from "../components/ExpensesHeader";

const Expenses = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <ExpensesHeader />
            </div>
        </div>
    );
};

export default Expenses;