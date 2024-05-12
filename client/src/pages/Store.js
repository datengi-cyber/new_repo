import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import "./pages.css"

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="store-container">
      <div className="store-content">
        <div className="store-header">
          <span className="store-title">Manage Store</span>
          <button className="store-add-btn" onClick={toggleModal}>
            Add Store
          </button>
        </div>
        {showModal && <AddStore />}
        {stores.map((element, index) => (
          <div className="store-item" key={element._id}>
            <img alt="store" className="store-image" src={element.image} />
            <div className="store-details">
              <span className="store-name">{element.name}</span>
              <div className="store-location">
                <img alt="location-icon" className="location-icon" src={require("../assets/location-icon.png")} />
                <span>{element.address + ", " + element.city}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
