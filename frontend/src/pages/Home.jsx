import React from "react";
import Sidebar from "../components/Sidebar";
import AllUsers from "../components/AllUsers";


const Home = () => {
    return (
        <div>
        <div className="bg-gray-50">
            <Sidebar />
        </div>
        <div>
            <AllUsers />
        </div>
        </div>
    );
};

export default Home;