import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const AddProduct = () => {
  const {products, setProducts} = useContext(ProductContext)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  function handleNameChange(e){
    setName(e.target.value.toLowerCase())
  }
  function handlePriceChange(e){
    setPrice(e.target.value)
  }
  function handleImageChange(e){
    setImage(e.target.value)
  }
  function handleDescriptionChange(e){
    setDescription(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image, description }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data)=>{
          setProducts([...products, data])
          navigate("/")  
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  function handleCancel(){
    navigate("/")
  }

  return (
    <div className="AddProduct">
      <form className="AddProduct" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
        <input type="text" placeholder="Name" onChange={handleNameChange}/>
        <input type="number" placeholder="Price" step={"0.01"} onChange={handlePriceChange}/>
        <input type="text" placeholder="Image" onChange={handleImageChange}/>
        <textarea form="AddProduct" placeholder="Description min 15 char" onChange={handleDescriptionChange}/>
        <button>Add Product</button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;