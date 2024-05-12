import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProdcut";
import AuthContext from "../AuthContext";
import "./invent.css";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]);

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete item
  const deleteItem = (id) => {
    console.log("Product ID: ", id);
    console.log(`http://localhost:4000/api/product/delete/${id}`);
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="inventory-container">
      <div className="inventory-wrapper">
        <div className="inventory-header">
          <span className="inventory-header__title">Clothify Inventory</span>
          <div className="inventory-stats">
            <div className="inventory-stat">
              <span className="stat-label">Total Products</span>
              <span className="stat-value">{products.length}</span>
              <span className="stat-note">Last 7 days </span>
            </div>
            <div className="inventory-stat inventory-stat--border">
              <span className="stat-label">Stores</span>
              <div className="stat-group">
                <div>
                  <span className="stat-value">{stores.length}</span>
                  <span className="stat-note">Last 7 days </span>
                </div>
                <div>
                  <span className="stat-value"> 0</span>
                  <span className="stat-note">Revenue</span>
                </div>
              </div>
            </div>
            <div className="inventory-stat inventory-stat--border">
              <span className="stat-label">Top Selling</span>
              <div className="stat-group">
                <div>
                  <span className="stat-value"> 0</span>
                  <span className="stat-note">Last 7 days</span>
                </div>
                <div>
                  <span className="stat-value"> 0</span>
                  <span className="stat-note">Cost</span>
                </div>
              </div>
            </div>
            <div className="inventory-stat inventory-stat--border">
              <span className="stat-label">Low Stocks</span>
              <div className="stat-group">
                <div>
                  <span className="stat-value"> 0</span>
                  <span className="stat-note">Ordered</span>
                </div>
                <div>
                  <span className="stat-value"> 0</span>
                  <span className="stat-note">Not in Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={() => setUpdatePage(!updatePage)}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}
      </div>
      <div className="inventory-table">
        <div className="inventory-table__header">
          {/* Inventory table header */}
          <div className="inventory-actions">
            <button className="inventory-action__button" onClick={addProductModalSetting}>
              Add Product
            </button>
            <input
              className="inventory-action__search"
              type="search"
              value={searchTerm}
              onChange={handleSearchTerm}
              placeholder="Search Products"
            />
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price per</th>
              <th>Image</th> 
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => !searchTerm || product.name.includes(searchTerm))
              .map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.size}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>
                  <td><img src={product.image} alt={product.name} className="prod_img" /></td>
                  </td> {/* Display image */}
                  <td>{product.stock > 0 ? "In Stock" : "Not in Stock"}</td>
                  <td>
                   
                    <button onClick={() => updateProductModalSetting(product)}>Edit</button>
                    <button onClick={() => deleteItem(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;