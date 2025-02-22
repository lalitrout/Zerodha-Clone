import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import MobileDashboard from "./MobileDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isNowSmallScreen = window.innerWidth < 768;
      setIsSmallScreen(isNowSmallScreen);

      if (isNowSmallScreen && location.pathname !== "/mobile-dashboard") {
        navigate("/mobile-dashboard");
      } else if (!isNowSmallScreen && location.pathname === "/mobile-dashboard") {
        navigate("/");
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Run once to check the initial screen size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname, navigate]);

  return (
    <div className={isSmallScreen ? "contain" : "dashboard-container"}>
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/mobile-dashboard" element={<MobileDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
