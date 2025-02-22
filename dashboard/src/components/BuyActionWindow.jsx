import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleBuyClick = () => {
    axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container p-4 bg-light rounded shadow" id="buy-window">
      <div className="row">
        <div className="col-12 mb-3">
          <label className="form-label">Qty.</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setStockQuantity(e.target.value)}
            value={stockQuantity}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            step="0.05"
            onChange={(e) => setStockPrice(e.target.value)}
            value={stockPrice}
          />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-12 text-center mb-3">
          <span className="fw-bold">Margin required ₹140.65</span>
        </div>
        <div className="col-6 d-grid">
          <Link className="btn btn-primary" onClick={handleBuyClick}>
            Buy
          </Link>
        </div>
        <div className="col-6 d-grid">
          <Link to="" className="btn btn-secondary" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
