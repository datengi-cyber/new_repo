import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import "./sale.css"; 

export default function AddSale({
  addSaleModalSetting,
  products,
  stores,
  handlePageUpdate,
  authContext
}) {
  const [sale, setSale] = useState({
    userID: authContext.user,
    productID: "",
    storeID: "",
    stockSold: "",
    saleDate: "",
    totalSaleAmount: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setSale({ ...sale, [key]: value });
  };

  // POST Data
  const addSale = () => {
    fetch("http://localhost:4000/api/sales/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sale),
    })
      .then((result) => {
        alert("Sale ADDED");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="customDialogContainer"
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
          <div className="customDialogOverlay" />
        </Transition.Child>
  
        <div className="customDialogContainer">
          <div className="customDialogPanel">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                  >
                    Add Sale
                  </Dialog.Title>
                  <form action="#">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="productID"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <select
                          id="productID"
                          className="customInputStyle"
                          name="productID"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="" disabled selected>
                            Select Products
                          </option>
                          {products.map((element, index) => (
                            <option key={element._id} value={element._id}>
                              {element.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="stockSold"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Stock Sold
                        </label>
                        <input
                          type="number"
                          name="stockSold"
                          id="stockSold"
                          value={sale.stockSold}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          className="customInputStyle"
                          placeholder="0 - 999"
                        />
                      </div>
  
                      <div>
                        <label
                          htmlFor="storeID"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Store Name
                        </label>
                        <select
                          id="storeID"
                          className="customInputStyle"
                          name="storeID"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        >
                          <option value="" disabled selected>
                            Select Store
                          </option>
                          {stores.map((element, index) => (
                            <option key={element._id} value={element._id}>
                              {element.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="totalSaleAmount"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Total Sale Amount
                        </label>
                        <input
                          type="number"
                          name="totalSaleAmount"
                          id="price"
                          value={sale.totalSaleAmount}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          className="customInputStyle"
                          placeholder="$299"
                        />
                      </div>
                      <div className="h-fit w-fit">
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="salesDate"
                        >
                          Sales Date
                        </label>
                        <input
                          className="customInputStyle"
                          type="date"
                          id="saleDate"
                          name="saleDate"
                          value={sale.saleDate}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="customBtnPrimary"
                        onClick={addSale}
                      >
                        Add Sale
                      </button>
                      <button
                        type="button"
                        className="customBtnSecondary"
                        onClick={() => addSaleModalSetting()}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
  
}
