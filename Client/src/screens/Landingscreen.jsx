import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Create a separate CSS file for better styling

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12">
        <div className="content">
          <h1 className="title">Booking.com</h1>
          <p className="subtitle">"Book Your Hotel Room."</p>
          <Link to="/register">
            <button className="btn-1 btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landingscreen;
