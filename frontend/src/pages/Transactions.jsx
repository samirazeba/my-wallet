import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import TransactionsHeader from "../components/TransactionsHeader";
import TransactionsTable from "../components/TransactionsTable";

const Transactions = () => {
    const [dateFilter, setDateFilter] = useState(null);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <TransactionsHeader  onDateChange={setDateFilter}/>
                <TransactionsTable dateFilter={dateFilter}/>
            </div>
        </div>
    );
};

export default Transactions;