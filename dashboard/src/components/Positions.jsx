import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-clone-6f98.onrender.com/allPositions") // ✅ Fixed API URL
      .then((res) => setAllPositions(res.data))
      .catch((err) => console.error("Error fetching positions:", err));
  }, []);

  const formatNumber = (num) =>
    num.toLocaleString("en-IN", { minimumFractionDigits: 2 });

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {allPositions.length === 0 ? (
        <div className="no-orders">
          <p>No active positions available.</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const profitLoss = curValue - stock.avg * stock.qty;
                const profClass = profitLoss >= 0 ? "profit" : "loss";
                const dayClass = stock.net < 0 ? "loss" : "profit";

                return (
                  <tr key={stock.id || index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{formatNumber(stock.avg)}</td>
                    <td>{formatNumber(stock.price)}</td>
                    <td className={profClass}>{formatNumber(profitLoss)}</td>
                    <td className={dayClass}>{formatNumber(stock.day)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
