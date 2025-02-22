import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling

// Inline SVG icons
const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M13 2.05V22a9.97 9.97 0 0 0 8-9.95c0-5.18-3.95-9.45-8-10zM11 2.05C6.05 2.55 2 6.82 2 12s4.05 9.45 9 9.95V2.05zM22 12c0-5.18-3.95-9.45-8-10v10h8z" />
  </svg>
);

const BoxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M21 16.5V7.5l-9-5-9 5v9l9 5 9-5zM3.83 7L12 2.43 20.17 7H3.83zM12 21.5L4 17.5v-7l8 4.5V21.5zm1-7.5l8-4.5v7l-8 4.5V14z" />
  </svg>
);

const MobileDashboard = () => {
  return (
    <div className="mobile-dashboard vh-100 d-flex flex-column align-items-center bg-light">
      {/* Notification Banner */}
      <div className="alert alert-warning text-center w-100">
      ⚠️ This is a demonstration platform using test data. Please use a system screen to access the live platform.
      </div>

      {/* Welcome Text */}
      <h2 className="mt-3">Hi, Demo</h2>

      {/* Equity Card */}
      <div className="card w-75 my-2 shadow-sm">
        <div className="card-body">
          <h5 className="card-title d-flex align-items-center">
            <ChartIcon className="me-2" /> Equity
          </h5>
          <p className="card-text">
            <strong>1L</strong> Margin Available
          </p>
          <p className="small">Margins used: 0</p>
          <p className="small">Opening balance: 1L</p>
          <a href="#" className="text-primary">
            View statement
          </a>
        </div>
      </div>

      {/* Commodity Card */}
      <div className="card w-75 my-2 shadow-sm">
        <div className="card-body">
          <h5 className="card-title d-flex align-items-center">
            <BoxIcon className="me-2" /> Commodity
          </h5>
          <p className="card-text">
            <strong>50K</strong> Margin Available
          </p>
          <p className="small">Margins used: 0</p>
          <p className="small">Opening balance: 50K</p>
          <a href="#" className="text-primary">
            View statement
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;
