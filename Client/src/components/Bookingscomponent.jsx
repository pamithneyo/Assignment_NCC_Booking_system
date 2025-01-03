import React, { useEffect, useState } from 'react';
import { Table, Pagination, Alert } from 'antd';
import axios from 'axios';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchBookings = async (page = 1) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/bookings/getallbookings`, { page });
            console.log(data);
            
            setBookings(data);
            setTotal(data.total); // Assuming API returns total bookings
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings(currentPage);
    }, [currentPage]);

    if (error) {
        return (
            <Alert
                message="Error"
                description={error.message || "Failed to load bookings. Please try again later."}
                type="error"
                showIcon
            />
        );
    }

    const columns = [
        { title: 'Booking ID', dataIndex: '_id', key: '_id' },
        { title: 'User ID', dataIndex: 'userid', key: 'userid' },
        { title: 'Room', dataIndex: 'room', key: 'room' },
        { title: 'From', dataIndex: 'fromdate', key: 'fromdate' },
        { title: 'To', dataIndex: 'todate', key: 'todate' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];

    return (
        <div>
            <h1>Bookings</h1>
            <Table
                dataSource={bookings}
                columns={columns}
                loading={loading}
                rowKey="_id"
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={total}
                pageSize={10}
                onChange={(page) => setCurrentPage(page)}
                className="mt-3"
            />
        </div>
    );
}

export default Bookings;
