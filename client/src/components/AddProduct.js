import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import UploadImage from "./UploadImage";
import AuthContext from "../AuthContext";
import "./productAdd.css";

export default function ProductAdd({
  addProductModalSetting,
  handlePageUpdate,
}) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    size: "", 
    price: "",
    category: "", 
    description: "",
    image: "",
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const addProduct = () => {
    fetch("http://localhost:4000/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add product");
      })
      .then((data) => {
        alert("Product ADDED");
        handlePageUpdate();
        addProductModalSetting();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/dbvmndqwu/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct({ ...product, image: data.url });
        alert("Product Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="product-add-modal"
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
          <div className="modal-overlay" />
        </Transition.Child>

        <div className="modal-container1">
          <div className="modal-content2">
            <div className="modal-header3">
              <div className="modal-icon1">
                <PlusIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
              </div>
              <div className="modal-title1">
                <Dialog.Title>Add Product</Dialog.Title>
              </div>
            </div>
            <div className="modal-body1">
              <form action="#">
                <div className="form-group4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group4">
                  <label htmlFor="manufacturer">Brand</label>
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    value={product.manufacturer}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group4">
                  <label htmlFor="size">Size</label>
                  <input
                    type="text"
                    name="size"
                    id="size"
                    value={product.size}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
                <div className="form-group4">
    <label htmlFor="price">Price per</label>
    <input
      type="number"
      name="price"
      id="price"
      value={product.price}
      onChange={(e) => handleInputChange(e.target.name, e.target.value)}
    />
  </div>
                <div className="form-group4">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    id="category"
                    value={product.category}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
                <div className="form-group4">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    rows="5"
                    name="description"
                    value={product.description}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  />
                </div>
              </form>
              <UploadImage uploadImage={uploadImage} />
            </div>
            <div className="modal-footer1">
              <button type="button" onClick={addProduct}>Add Product</button>
              <button type="button" onClick={() => addProductModalSetting()} ref={cancelButtonRef}>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
