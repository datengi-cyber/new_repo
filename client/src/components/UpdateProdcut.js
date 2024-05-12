import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import "./updateProduct.css"; 

export default function UpdateProduct({
  updateProductData,
  updateModalSetting,
}) {
  const { _id, name, manufacturer, description } = updateProductData;
  const [product, setProduct] = useState({
    productID: _id,
    name: name,
    manufacturer: manufacturer,
    description: description,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    console.log(key);
    setProduct({ ...product, [key]: value });
  };

  const updateProduct = () => {
    fetch("http://localhost:4000/api/product/update", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product Updated");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="dialog-overlay"
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
          <div className="dialog-container">
            <div className="">
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
              <h3 className="dialog-title">Update Product</h3>
              <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={product.name}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      className="dialog-input"
                      placeholder="Ex. Apple iMac 27&ldquo;"
                    />
                  </div>
                  <div>
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      id="manufacturer"
                      value={product.manufacturer}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                      className="dialog-input"
                      placeholder="Ex. Apple"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      rows="5"
                      name="description"
                      className="dialog-textarea"
                      placeholder="Write a description..."
                      value={product.description}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    >
                     
                    </textarea>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="dialog-button dialog-button-primary"
                    onClick={updateProduct}
                  >
                    Update Product
                  </button>
                  <button
                    type="button"
                    className="dialog-button dialog-button-cancel"
                    onClick={() => updateModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
