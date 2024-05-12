import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";
import "./compo.css"; 

function Layout() {
  return (
    <>
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content">
        <div className="side-menu">
          <SideMenu />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
