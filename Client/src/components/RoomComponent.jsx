import React, { useEffect, useState } from 'react';
import { Table, Alert } from 'antd';
import axios from 'axios';

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/rooms/getallrooms');
                setRooms(data.rooms);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (error) {
        return (
            <Alert
                message="Error"
                description={error.message || "Failed to load rooms. Please try again later."}
                type="error"
                showIcon
            />
        );
    }

    const columns = [
        { title: 'Room ID', dataIndex: '_id', key: '_id' },
        { title: 'Room Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Rent per Day', dataIndex: 'rentperday', key: 'rentperday' },
        { title: 'Max Count', dataIndex: 'maxcount', key: 'maxcount' },
        { title: 'Phone Number', dataIndex: 'phonenumber', key: 'phonenumber' },
    ];

    return (
        <div>
            <h1>Rooms</h1>
            <Table dataSource={rooms} columns={columns} loading={loading} rowKey="_id" />
        </div>
    );
}

export default Rooms;
