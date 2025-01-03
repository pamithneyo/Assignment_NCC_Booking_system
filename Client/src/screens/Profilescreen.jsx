import React, { useState, useEffect } from 'react';
import { Tabs, Tag, Card, Row, Col, Spin, Button } from 'antd';
import axios from "axios";
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { UserOutlined, CalendarOutlined, DollarOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className='container mt-5 ml-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Profile" key='1'>
                    <Card bordered={false} style={{ textAlign: 'left' }}>
                        <h1 style={{ marginBottom: '20px' }}>My Profile</h1>
                        <p><UserOutlined /> <b>Name:</b> {user.name}</p>
                        <p><UserOutlined /> <b>Email:</b> {user.email}</p>
                        <p><InfoCircleOutlined /> <b>Is Admin:</b> {user.isAdmin ? 'Yes' : 'No'}</p>
                    </Card>
                </TabPane>
                <TabPane tab="Bookings" key='2'>
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Profilescreen;

export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user || !user._id) {
                setError("User ID is missing or invalid");
                return;
            }

            try {
                const response = await axios.post('http://localhost:5000/api/bookings/getbookingsbyuserid', {
                    userid: user._id,
                });
                setBookings(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch bookings");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    async function cancelBooking(bookingid, roomid) {
        try {
            await axios.post("http://localhost:5000/api/bookings/cancelbooking", { bookingid, roomid });
            Swal.fire('Success', 'Your booking has been cancelled.', 'success').then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Oops', 'Something went wrong', 'error');
        }
    }

    return (
        <div>
            {loading ? (
                <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
            ) : error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : bookings.length > 0 ? (
                <Row gutter={16}>
                    {bookings.map((booking) => (
                        <Col xs={24} sm={12} md={8} key={booking._id}>
                            <Card
                                title={booking.room}
                                bordered
                                style={{ marginBottom: '20px' }}
                                extra={
                                    booking.status !== 'cancelled' && (
                                        <Button
                                            danger
                                            onClick={() => cancelBooking(booking._id, booking.roomid)}
                                        >
                                            Cancel
                                        </Button>
                                    )
                                }
                            >
                                <p><CalendarOutlined /> <b>Booking ID:</b> {booking._id}</p>
                                <p><CalendarOutlined /> <b>Check In:</b> {booking.fromdate}</p>
                                <p><CalendarOutlined /> <b>Check Out:</b> {booking.todate}</p>
                                <p><DollarOutlined /> <b>Amount:</b> {booking.totalamount}</p>
                                <p>
                                    <InfoCircleOutlined /> <b>Status:</b>{" "}
                                    {booking.status === "cancelled" ? (
                                        <Tag color="red">Cancelled</Tag>
                                    ) : (
                                        <Tag color="green">Confirmed</Tag>
                                    )}
                                </p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <h1 style={{ textAlign: 'center' }}>No bookings found.</h1>
            )}
        </div>
    );
}
