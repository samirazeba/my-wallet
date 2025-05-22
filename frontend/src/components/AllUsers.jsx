import React from "react";
import useFetchAllUsers from "../hooks/useFetchAllUsers";
import { useEffect } from "react";

const AllUsers = () => {

    const { users, error, loading, fetchAllUsers } = useFetchAllUsers();

    useEffect (() => {
        fetchAllUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>All Users</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default AllUsers;