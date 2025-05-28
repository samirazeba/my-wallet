import React from "react";
import Sidebar from "../components/Sidebar";
import CategoriesHeader from "../components/CategoriesHeader";

const Categories = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <CategoriesHeader />
            </div>
        </div>
    );
};

export default Categories;