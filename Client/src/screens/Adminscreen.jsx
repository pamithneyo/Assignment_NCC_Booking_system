// import React, { useEffect, useState } from 'react';
// import { Tabs, Alert } from 'antd'; // Ensure Alert is correctly imported from 'antd'
// import axios from 'axios';
// import Error from '../components/Error'; // Ensure Error component exists and is implemented correctly

// const { TabPane } = Tabs;

// function Adminscreen() {

//     useEffect(() => {
//         try {
//           const user = JSON.parse(localStorage.getItem('currentUser'));
//           if (!user || !user.isAdmin) {
//             window.location.href = '/home';
//           }
//           else{
//             window.location.href = '/admin';
//           }
//         } catch (error) {
//           console.error('Error parsing currentUser:', error);
//           window.location.href = '/home'; // Redirect on error
//         }
//       }, []);

//     return (
//         <div className='mt-3 ml-1 mr-3 bs'>
//             <h2 className='mt-5 text-center' style={{ fontSize: '30px' }}>
//                 <b>Admin Panel</b>
//             </h2>
//             <Tabs defaultActiveKey='1'>
//                 <TabPane tab="Bookings" key='1'>
//                     <Bookings />
//                 </TabPane>
//                 <TabPane tab="Rooms" key='2'>
//                     <Rooms/>
//                 </TabPane>
//                 <TabPane tab="Add Rooms" key='3'>
//                     <Addroom/>
//                 </TabPane>
//                 <TabPane tab="Users" key='4'>
//                      <Users/>
//                 </TabPane>
//             </Tabs>
//         </div>
//     );
// }

// export default Adminscreen;


// // Booking List Component

// export function Bookings() {
//     const [bookings, setBookings] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const data = await (await axios.post("http://localhost:5000/api/bookings/getallbookings")).data;
//                 setBookings(data); // Ensure `bookings` is always an array
//             } catch (err) {
//                 console.error("Error fetching bookings:", err);
//                 setError(err);
//             }
//         };

//         fetchBookings();
//     }, []);

//     if (error) {
//         return (
//             <Alert
//                 message="Error"
//                 description={error.message || "Failed to load bookings. Please try again later."}
//                 type="error"
//                 showIcon
//             />
//         );
//     }

//     return (
//         <div className='row'>
//             <div className='col-md-10'>
//                 <h1>Bookings</h1>
//                 <table className='table table-bordered table-dark'>
//                     <thead className='bs'>
//                         <th className='col-md-3'>Booking Id</th>
//                         <th className='col-md-3'>User Id</th>
//                         <th className='col-md-2'>Room</th>
//                         <th className='col-md-2'>From</th>
//                         <th className='col-md-2'>To</th>
//                         <th className='col-md-2'>Staus</th>
//                     </thead>
//                     <tbody>
//                         {bookings.length && (bookings.map(booking => {
//                             return <tr>
//                                 <td>{booking._id}</td>
//                                 <td>{booking.userid}</td>
//                                 <td>{booking.room}</td>
//                                 <td>{booking.fromdate}</td>
//                                 <td>{booking.todate}</td>
//                                 <td>{booking.status}</td>
//                             </tr>

//                         }))}
//                     </tbody>
//                 </table>

//             </div>
//         </div>
//     );
// }

// ///Room Component

// export function Rooms() {
//     const [rooms, setRooms] = useState([]);
//     const [duplicaterooms, setDuplicaterooms] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null); // Initialize error state with null

//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {
//                 setLoading(true); // Start loading
//                 setError(null); // Reset error before fetching
//                 const response = await fetch('http://localhost:5000/api/rooms/getallrooms');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log('Fetched data:', data);
//                 setRooms(data.rooms); // Update rooms state with fetched data
//                 setDuplicaterooms(data.rooms); // Set duplicate rooms
//             } catch (error) {
//                 setError(error); // Set the error state if fetching fails
//                 console.error('Error fetching rooms:', error.message);
//             } finally {
//                 setLoading(false); // Stop loading
//             }
//         };

//         fetchRooms();
//     }, []); // Empty dependency array means this will run only once when the component mounts

//     if (loading) {
//         return <div>Loading...</div>; // Display loading indicator
//     }

//     if (error) {
//         return (
//             <Alert
//                 message="Error"
//                 description={error.message || "Failed to load rooms. Please try again later."}
//                 type="error"
//                 showIcon
//             />
//         );
//     }

//     return (
//         <div className="row">
//             <div className="col-md-10">
//                 <h1>Rooms</h1>
//                 <table className="table table-bordered table-dark">
//                     <thead className="bs">
//                         <tr>
//                             <th className="col-md-3">Room Id</th>
//                             <th className="col-md-3">Room Name</th>
//                             <th className="col-md-2">Type</th>
//                             <th className="col-md-2">Rent per day</th>
//                             <th className="col-md-2">Max count</th>
//                             <th className="col-md-2">Phone number</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {rooms.length > 0 ? (
//                             rooms.map((room) => (
//                                 <tr key={room._id}>
//                                     <td>{room._id}</td>
//                                     <td>{room.name}</td>
//                                     <td>{room.type}</td>
//                                     <td>{room.rentperday}</td>
//                                     <td>{room.maxcount}</td>
//                                     <td>{room.phonenumber}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center">
//                                     No rooms available
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


// // User Component

// export function Users() {
    
//     const [users, setusers] = useState([]); // State for users
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null); // Initialize error state with null

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 setLoading(true); // Start loading
//                 setError(null); // Reset error before fetching
//                 const response = await fetch('http://localhost:5000/api/users/getallusers');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log('Fetched data:', data);
//                 setusers(data); // Update rooms state with fetched data

//             } catch (error) {
//                 setError(error); // Set the error state if fetching fails
//                 console.error('Error fetching users:', error.message);
//             } finally {
//                 setLoading(false); // Stop loading
//             }
//         };

//         fetchUsers();
//     }, []); // Empty dependency array means this will run only once when the component mounts


//     if (loading) {
//         return <div>Loading...</div>; // Show loading message
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>; // Show error message
//     }

//     return (
//         <div className='row'>
//             <div className='col-md-12'>
//                 <h1>Users</h1>
//                 <table className='table table-dark table table-bordered'>
//                     <thead>
//                         <tr>
//                             <th>User Id: </th>
//                             <th>User Name:</th>
//                             <th>User Email: </th>
//                             <th>Is Admin: </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.length > 0 ? (
//                             users.map((user) => (
//                                 <tr key={user._id}>
//                                     <td>{user._id}</td>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.isAdmin ? 'Yes':'No'}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center">
//                                     No rooms available
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>

//                 </table>
//             </div>
            
            
//         </div>
//     );
// }

// //Add Room Component

// export function Addroom() {
//     const [formData, setFormData] = useState({
//       roomName: "",
//       rentPerDay: "",
//       maxCount: "",
//       description: "",
//       phoneNumber: "",
//       imageUrl1: "",
//       imageUrl2: "",
//       imageUrl3: "",
//     });
  
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     const handleSubmit = () => {
//       // Basic validation
//       const { roomName, rentPerDay, maxCount, phoneNumber } = formData;
//       if (!roomName || !rentPerDay || !maxCount || !phoneNumber) {
//         alert("Please fill in all required fields");
//         return;
//       }
//       console.log("Room Details:", formData);
//       // Add further processing, e.g., API calls, here
//     };
  
//     return (
//       <div className="row justify-content-center mt-4">
//         <div className="col-md-6">
//           <h2 className="text-center mb-4">Add Room</h2>
//           <div className="card p-4 shadow-sm">
//             <input
//               type="text"
//               name="roomName"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Room Name"
//               value={formData.roomName}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <input
//               type="text"
//               name="rentPerDay"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Rent per Day"
//               value={formData.rentPerDay}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <input
//               type="text"
//               name="maxCount"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Max Count"
//               value={formData.maxCount}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <textarea
//               name="description"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Description"
//               rows="2"
//               value={formData.description}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             ></textarea>
//             <input
//               type="text"
//               name="phoneNumber"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Phone Number"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <input
//               type="text"
//               name="imageUrl1"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Image URL 1"
//               value={formData.imageUrl1}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <input
//               type="text"
//               name="imageUrl2"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Image URL 2"
//               value={formData.imageUrl2}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <input
//               type="text"
//               name="imageUrl3"
//               className="form-control mb-3 rounded-pill"
//               placeholder="Image URL 3"
//               value={formData.imageUrl3}
//               onChange={handleChange}
//               style={{ borderColor: "#6c757d", fontSize: "1.1rem" }}
//             />
//             <button
//               className="btn btn-primary w-100 rounded-pill"
//               onClick={handleSubmit}
//               style={{ fontSize: "1.1rem" }}
//             >
//               Add Room
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }


import React, { useEffect, lazy, Suspense } from 'react';
import { Tabs, Spin } from 'antd';

const { TabPane } = Tabs;

// Lazy-loaded components
const Bookings = lazy(() => import('../components/Bookingscomponent'));
const Rooms = lazy(() => import('../components/RoomComponent'));
const AddRoom = lazy(() => import('../components/Addroomcomponent'));
const Users = lazy(() => import('../components/Userscomponent'));

function AdminScreen() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user || !user.isAdmin) {
            window.location.href = '/home';
        }
    }, []);

    return (
        <div className="mt-3 ml-1 mr-3 bs">
            <h2 className="mt-5 text-center" style={{ fontSize: '30px' }}>
                <b>Admin Panel</b>
            </h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Suspense fallback={<Spin size="large" />}>
                        <Bookings />
                    </Suspense>
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Suspense fallback={<Spin size="large" />}>
                        <Rooms />
                    </Suspense>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Suspense fallback={<Spin size="large" />}>
                        <AddRoom />
                    </Suspense>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Suspense fallback={<Spin size="large" />}>
                        <Users />
                    </Suspense>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default AdminScreen;
