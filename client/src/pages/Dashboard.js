import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./dash.css"; 

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ],
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const [doughnutData, setDoughnutData] = useState(null); // Initialize doughnutData state

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
    fetchMonthlySalesData1();
    
  }, []);

  const fetchTotalSaleAmount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`);
      const datas = await response.json();
      setSaleAmount(datas.totalSaleAmount);
    } catch (error) {
      console.error('Failed to fetch total sale amount:', error);
    }
  };

  const fetchMonthlySalesData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/sales/getmonthly`);
      const datas = await response.json();
      console.log('Monthly sales data:', datas); 
      updateChartData(datas.salesAmount);
      calculateDoughnutData(datas.productStock);
    } catch (error) {
      console.error('Failed to fetch monthly sales data:', error);
    }
  };
  
  const fetchMonthlySalesData1 = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/sales/getmonthly`);
      if (!response.ok) {
        throw new Error(`Failed to fetch monthly sales data: ${response.status} ${response.statusText}`);
      }
      const datas = await response.json();
      console.log('Monthly sales data:', datas); // Log the response
      if (!datas || !datas.salesAmount || !datas.productStock) {
        throw new Error('Invalid data format in the response');
      }
      updateChartData(datas.salesAmount);
      calculateDoughnutData(datas.productStock); // Call function to calculate doughnutData
    } catch (error) {
      console.error(error);
    }
  };
  

  const fetchTotalPurchaseAmount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`);
      const datas = await response.json();
      setPurchaseAmount(datas.totalPurchaseAmount);
    } catch (error) {
      console.error('Failed to fetch total purchase amount:', error);
    }
  };

  const fetchStoresData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/store/get/${authContext.user}`);
      const datas = await response.json();
      setStores(datas);
    } catch (error) {
      console.error('Failed to fetch store data:', error);
    }
  };

  const fetchProductsData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/product/get/${authContext.user}`);
      const datas = await response.json();
      setProducts(datas);
    } catch (error) {
      console.error('Failed to fetch product data:', error);
    }
  };

  // const fetchMonthlySalesData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/sales/getmonthly`);
  //     const datas = await response.json();
  //     updateChartData(datas.salesAmount);
  //     calculateDoughnutData(datas.productStock); // Call function to calculate doughnutData
  //   } catch (error) {
  //     console.error('Failed to fetch monthly sales data:', error);
  //   }
  // };

  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [{
        name: "Monthly Sales Amount",
        data: [...salesData]
      }]
    });
  };

  const calculateDoughnutData = (productStock) => {
    const categoryStock = {
      Tshirt: 0,
      coat: 0,
      jacket: 0,
      Hoodies: 0,
      pants: 0
    };

    productStock.forEach((product) => {
      switch (product.category) {
        case "Tshirt":
          categoryStock.Tshirt += product.stock;
          break;
        case "coat":
          categoryStock.coat += product.stock;
          break;
        case "jacket":
          categoryStock.jacket += product.stock;
          break;
        case "Hoodies":
          categoryStock.Hoodies += product.stock;
          break;
        case "pants":
          categoryStock.pants += product.stock;
          break;
        default:
          break;
      }
    });

    setDoughnutData({
      labels: ["Tshirt", "coat", "jacket", "Hoodies", "pants"],
      datasets: [
        {
          label: '# of Stock',
          data: [
            categoryStock.Tshirt,
            categoryStock.coat,
            categoryStock.jacket,
            categoryStock.Hoodies,
            categoryStock.pants
          ],
          backgroundColor: [
            'rgba(105, 99, 132, 1.8)', 
            'rgba(40, 122, 235, 1.8)',  
            'rgba(205, 106, 86, 1.8)',  
            'rgba(25, 102, 186, 1.8)',  
            'rgba(35, 106, 86, 1.8)'    
          ],
          borderColor: [
            'rgba(105, 99, 132, 1)',
            'rgba(40, 122, 235, 1)',
            'rgba(205, 106, 86, 1)',
            'rgba(25, 102, 186, 1)',
            'rgba(35, 106, 86, 1)'
          ],
          borderWidth: 2
        }
      ]
    });
  };

  return (
    <>
      <div className="dashboard-grid">
        <article className="dashboard-card">
          <div className="card-indicator green">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">?
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="small-text">0%</span>
          </div>
          <div>
            <strong className="text-label">Total Sales Amount </strong>
            <p>
              <span className="large-text">${saleAmount}</span>
              <span className="small-text secondary">0 </span>
            </p>
          </div>
        </article>
  
        <article className="dashboard-card">
          <div className="card-indicator red">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            <span className="small-text">0%</span>
          </div>
          <div>
            <strong className="text-label">Total Purchases Amount</strong>
            <p>
              <span className="large-text">${purchaseAmount}</span>
              <span className="small-text secondary"> 0 </span>
            </p>
          </div>
        </article>
  
        <article className="dashboard-card">
          <div>
            <strong className="text-label">Total Products</strong>
            <p>
              <span className="large-text">{products.length}</span>
            </p>
          </div>
        </article>
  
        <article className="dashboard-card">
          <div>
            <strong className="text-label">Total Stores</strong>
            <p>
              <span className="large-text">{stores.length}</span>
            </p>
          </div>
        </article>
  
        <div className="charts">
          <div>
            <Chart options={chart.options} series={chart.series} type="bar" width="500" />
          </div>
          <div>
            {doughnutData && <Doughnut data={doughnutData} />} {/* Render Doughnut component only if doughnutData is available */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
