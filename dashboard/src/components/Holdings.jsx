import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "./Holdings.css"

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  const formatNumber = (num) => {
    return num !== undefined && num !== null
      ? num.toLocaleString("en-IN", { minimumFractionDigits: 2 })
      : "N/A";
  };

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h3 className="title">Holdings ({allHoldings.length})</h3>

            <div className="order-table table-responsive">
              <table  className="table table-striped">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Avg. cost</th>
                    <th>LTP</th>
                    <th>Cur. val</th>
                    <th>P&L</th>
                    <th>Net chg.</th>
                    <th>Day chg.</th>
                  </tr>
                </thead>
                <tbody>
                  {allHoldings.map((stock, index) => {
                    const curValue = stock.price * stock.qty;
                    const profitLoss = curValue - stock.avg * stock.qty;
                    const profClass = profitLoss >= 0 ? "profit" : "loss";
                    const dayClass = stock.net < 0 ? "loss" : "profit";

                    return (
                      <tr key={stock.id || index}>
                        <td>{stock.name}</td>
                        <td>{stock.qty}</td>
                        <td>{formatNumber(stock.avg)}</td>
                        <td>{formatNumber(stock.price)}</td>
                        <td>{formatNumber(curValue)}</td>
                        <td className={profClass}>
                          {formatNumber(profitLoss)}
                        </td>
                        <td className={profClass}>{formatNumber(stock.net)}</td>
                        <td className={dayClass}>{formatNumber(stock.day)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
