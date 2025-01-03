import React, { useEffect, useState } from 'react';
import { Table, Alert } from 'antd';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/users/getallusers');
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return (
            <Alert
                message="Error"
                description={error.message || "Failed to load users. Please try again later."}
                type="error"
                showIcon
            />
        );
    }

    const columns = [
        { title: 'User ID', dataIndex: '_id', key: '_id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Admin', dataIndex: 'isAdmin', key: 'isAdmin', render: (isAdmin) => (isAdmin ? 'Yes' : 'No') },
    ];

    return (
        <div>
            <h1>Users</h1>
            <Table dataSource={users} columns={columns} loading={loading} rowKey="_id" />
        </div>
    );
}

export default Users;
