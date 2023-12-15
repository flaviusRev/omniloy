/** @format */

import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "./routes";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ChatAssistant from "./components/ChatAssistant";

function App() {
  const location = useLocation();
  const showSidebarAndNavbar = !["/sign-in", "/sign-out"].includes(
    location.pathname
  );
  const showChatAssistant = !["/sign-in", "/sign-up"].includes(
    location.pathname
  );

  return (
    <div className="bg-[#FAFAFA] flex h-screen overflow-hidden">
      {showSidebarAndNavbar && (
        <div className="h-full">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {showSidebarAndNavbar && (
          <div className="w-full fixed top-0 z-10">
            <Navbar />
          </div>
        )}
        <div className="flex-1 overflow-auto pt-14">
          <Toaster position="top-right" />
          <Routes>
            {routes.map(
              ({ path, element }, key) =>
                element && <Route key={key} path={path} element={element} />
            )}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
      {showChatAssistant && <ChatAssistant />}
    </div>
  );
}

export default App;
