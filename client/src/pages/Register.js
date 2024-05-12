import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import "./pages.css"

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    imageUrl: "",
    agreedTerms: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((result) => {
        if (result.ok) {
          alert("Successfully Registered, Now Login with your details");
          navigate('/login');
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Registration failed. Please try again.");
      });
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dbvmndqwu/image/upload", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
      const imageData = await response.json();
      setForm((prevForm) => ({ ...prevForm, imageUrl: imageData.url }));
      alert("Image Successfully Uploaded");
    } catch (error) {
      console.log(error);
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="registration-page">
      <div className="image-side">
        <img src={require("../assets/clothify.png")} alt="Clothify Logo" />
      </div>
      <div className="form-side">
        <form onSubmit={registerUser}>
          <h2>Welcome! Sign-Up</h2>
          <input name="firstName" type="text" placeholder="First Name" value={form.firstName} onChange={handleInputChange} />
          <input name="lastName" type="text" placeholder="Last Name" value={form.lastName} onChange={handleInputChange} />
          <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleInputChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleInputChange} />
          <input name="phoneNumber" type="number" placeholder="Phone Number" value={form.phoneNumber} onChange={handleInputChange} />
          <UploadImage uploadImage={uploadImage} />
          <button type="submit">Sign up</button>
          <p>Already have an account? <Link to="/login">Sign in now</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
