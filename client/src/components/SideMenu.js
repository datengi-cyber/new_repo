import React from "react";
import { Link } from "react-router-dom";

import "./compo.css"; 

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="side-menu">
      <div className="menu-content">
        <nav aria-label="Main Nav">
          <Link to="/" className="menu-item">
            <img alt="dashboard-icon" src={require("../assets/dashboard-icon.png")} />
            <span>Dashboard</span>
          </Link>

          <details className="menu-details">
            <summary className="menu-summary">
              <Link to="/inventory">
                <div className="menu-link-content">
                  <img alt="inventory-icon" src={require("../assets/inventory-icon.png")} />
                  <span>Inventory</span>
                </div>
              </Link>
            </summary>
          </details>

          <Link to="/purchase-details" className="menu-item">
            <img alt="purchase-icon" src={require("../assets/supplier-icon.png")} />
            <span>Purchase Details</span>
          </Link>
          <Link to="/sales" className="menu-item">
            <img alt="sale-icon" src={require("../assets/supplier-icon.png")} />
            <span>Sales</span>
          </Link>

          <details className="menu-details">
            <summary className="menu-summary">
              <Link to="/manage-store">
                <div className="menu-link-content">
                  <img alt="store-icon" src={require("../assets/order-icon.png")} />
                  <span>Manage Store</span>
                </div>
              </Link>
            </summary>
          </details>

          <Link to="/Setting" className="menu-item">
            <img className=" setting-icon" alt="setting-icon" src={require("../assets/setting.gif")} />
            <span>Setting</span>
          </Link>
        </nav>
      </div>

      <div className="menu-footer">
        <div className="profile-section">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="profile-image"
          />

          <div>
            <p>
              <strong>{localStorageData.firstName }</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
