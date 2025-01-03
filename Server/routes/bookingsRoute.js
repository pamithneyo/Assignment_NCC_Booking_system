const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
const stripe = require('stripe')('sk_test_51QbgIWP77BsglEvywnjfbxGGIGRdw40Q6AKteQ07uHDrqSaBmkPl9yWWqDjjdIoQUWQygD9SN78tfrGPeLZwKIYl00mQSkcfEl'); // Replace with your Stripe secret key
const { v4: uuidv4 } = require('uuid');

// Route to handle room booking
router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

  try {
    if (!room || !userid || !fromdate || !todate || !totalamount || !totaldays || !token) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new Stripe customer with the token
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // Make the payment
    const payment = await stripe.charges.create({
      amount: totalamount * 100, // Stripe expects amount in cents
      customer: customer.id,
      currency: 'LKR', // Set currency
      receipt_email: token.email, // Send receipt to customer email
    }, {
      idempotencyKey: uuidv4(), // Unique ID for idempotency (prevents multiple charges for the same request)
    });

    if (payment) {
      // Create a new booking
      const newBooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        totalamount,
        totaldays,
        transactionId: payment.id, // Store the Stripe transaction ID
      });

      const booking = await newBooking.save();

      // Update the room bookings
      const roomtemp = await Room.findOne({ _id: room._id });
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format('DD-MM-YYYY'),
        todate: moment(todate).format('DD-MM-YYYY'),
        userid: userid,
        status: booking.status,
      });
      await roomtemp.save();

      // Send response
      res.status(201).json({
        message: "Booking created successfully",
        booking,
      });
    }
  } catch (error) {
    console.error("Error in bookroom:", error);
    return res.status(500).json({ error: "An error occurred while booking the room" });
  }
});

router.post("/getallbookings",async(req,res)=>{
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }

});



router.post("/getbookingsbyuserid",async(req,res)=>{
  const userid = req.body.userid
  try {
    const bookings = await Booking.find({userid : userid})
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({error})
  }

});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    // Find the booking by ID
    const booking = await Booking.findOne({ _id: bookingid });
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    
    // Update the status of the booking
    booking.status = "cancelled";
    await booking.save();

    // Find the room by ID
    const room = await Room.findOne({ _id: roomid });
    if (!room) {
      return res.status(404).send("Room not found");
    }

    // Filter out the canceled booking from current bookings
    const updatedBookings = room.currentbookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = updatedBookings;

    // Save the updated room information
    await room.save();

    // Send a success response
    res.send("Your booking has been cancelled successfully");
  } catch (error) {
    // Handle errors
    return res.status(400).json({ error });
  }
});

module.exports = router;
