import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import UploadImage from "./UploadImage";

import AuthContext from "../AuthContext";

export default function AddStore() {
  const authContext = useContext(AuthContext);
  const [form, setForm] = useState({
    userId: authContext.user,
    name: "",
    category: "",
    address: "",
    city: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const addProduct = () => {
    fetch("http://localhost:4000/api/store/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        alert("STORE ADDED");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  // Uploading image to cloudinary
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
        setForm({ ...form, image: data.url });
        alert("Store Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="modal-root"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="modal-enter"
          enterFrom="modal-enter-from"
          enterTo="modal-enter-to"
          leave="modal-leave"
          leaveFrom="modal-leave-from"
          leaveTo="modal-leave-to"
        >
          <div className="overlay" />
        </Transition.Child>

        <div className="modal-content">
          <div className="modal-header">
            <h3 className="title">Store Information</h3>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter Store Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="label">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={form.city}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter City Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="label">
                  Category
                </label>
                <select
                  id="category"
                  className="select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="Foot_wear"> Foot-wear</option>
                  <option value="All"> ALl</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Wholesale">WholeSale</option>
                  <option value="SuperMart">SuperMart</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <textarea
                  id="address"
                  rows="5"
                  name="address"
                  className="textarea"
                  placeholder="Write a address..."
                  value={form.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
            <UploadImage uploadImage={uploadImage} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={addProduct}>
              Add Store
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
