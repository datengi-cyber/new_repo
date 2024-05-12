import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import "./addPurchase.css";

export default function PurchaseDetailsForm({
  addSaleModalSetting,
  products,
  handlePageUpdate,
  authContext
}) {
  const [purchase, setPurchase] = useState({
    userID: authContext.user,
    productID: "",
    quantityPurchased: "",
    purchaseDate: "",
    totalPurchaseAmount: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  // console.log("PPu: ", purchase);

  const handleInputChange = (key, value) => {
    setPurchase({ ...purchase, [key]: value });
  };

  const addSale = () => {
    fetch("http://localhost:4000/api/purchase/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((result) => {
        alert("Purchase ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="purchase-dialog"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="overlay" />
        </Transition.Child>

        <div className="dialog-content">
          <div className="dialog-inner">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="dialog-panel">
                <div className="panel-content">
                  <div className="panel-header">
                    <h3 className="panel-title">Purchase Details</h3>
                  </div>
                  <form>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="productID">Product Name</label>
                        <select
                          id="productID"
                          name="productID"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="">Select Products</option>
                          {products.map((element, index) => (
                            <option key={element._id} value={element._id}>
                              {element.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="quantityPurchased">Quantity Purchased</label>
                        <input
                          type="number"
                          name="quantityPurchased"
                          id="quantityPurchased"
                          value={purchase.quantityPurchased}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          placeholder="0 - 999"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="totalPurchaseAmount">Total Purchase Amount</label>
                        <input
                          type="number"
                          name="totalPurchaseAmount"
                          id="price"
                          value={purchase.totalPurchaseAmount}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          placeholder="$299"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="purchaseDate">Purchase Date</label>
                        <input
                          type="date"
                          id="purchaseDate"
                          name="purchaseDate"
                          value={purchase.purchaseDate}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={addSale}>Add</button>
                      <button
                        type="button"
                        onClick={() => addSaleModalSetting()}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
