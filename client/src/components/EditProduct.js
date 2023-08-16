import React, { useState, useContext, useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const EditProduct = () => {
  const {products, setProducts} = useContext(ProductContext)
  const [errors, setErrors] = useState([]);
  const {id} = useParams()
  const current_product = products.find((product)=> product.id === parseInt(id))
  
  const [productObj, setProductObj] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  useEffect(() => {
    if (current_product) {
      setProductObj({
        name: current_product.name,
        price: current_product.price,
        image: current_product.image,
        description: current_product.description,
      });
    }
  }, [current_product]);
  
function handleEdit(editProduct){
  setProducts(products.map(product=>(product.id === editProduct.id? editProduct: product)))
}

  const navigate = useNavigate()
  function handleChange(e) {
    setProductObj({
        ...productObj,
        [e.target.name]: e.target.value,
      })
    }

  function handleSubmit(e){
    e.preventDefault();
    const editProduct ={
      name: productObj.name,
      price: productObj.price,
      description: productObj.description,
      image: productObj.image
      
  }
    fetch(`/products/${id}`,{
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
      },
      body: JSON.stringify(editProduct),

  })

  .then((r) => {
      if (r.ok) {
        r.json().then((data) =>{
          handleEdit(data)
          navigate("/") 
        })
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
      })
  }
  function handleCancel(){
    navigate("/")
  }

  return (
    <div className="EditProduct">
      <form className="EditProduct" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
        <input type="text" name="name" value={`${productObj.name}`} onChange={handleChange}/>
        <input type="number" name="price" value={`${productObj.price}`} step={"0.01"} onChange={handleChange}/>
        <input type="text" name="image" value={`${productObj.image}`} onChange={handleChange}/>
        <textarea form="EditProduct" name="description" value={`${productObj.description}`} onChange={handleChange}/>
        <button>Edit Product</button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;