import React from "react";
import Sidebar from "../components/Sidebar";
import TransactionsHeader from "../components/TransactionsHeader";


const Transactions = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <TransactionsHeader />
            </div>
        </div>
    );
};

export default Transactions;