import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrder(){
    const {user, setUser} = useContext(UserContext)
    const {products} = useContext(ProductContext)
    const {orders, setOrders} = useContext(OrderContext)
    const {id} = useParams()
    const navs = useNavigate()
    const numFund = parseFloat(user.fund)
    const [orderObj, setOrderObj]= useState({
        user_id: user.id,
        product_id: id,
        quantity: 1
    })
    const product = products.find((product) => product.id === parseInt(id));
    
    const [totalCost, setTotalCost] = useState(parseFloat(product.price).toFixed(2));
  
    function handleChange(e) {
        setOrderObj({
          ...orderObj,
          [e.target.name]: e.target.value,
        })
        const newTotalCost = parseFloat(product.price * parseInt(e.target.value));
        setTotalCost(newTotalCost);
    }

    function updateFund(){
      const newFund = numFund - totalCost
      const updatedUser = {
        fund: newFund
      };

      fetch(`/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
        .then((r) => {
          if (!r.ok) {
            throw new Error("Failed to update user fund.");
          }
          return r.json()
        })
        .then((data)=>
        {
          setUser(data)
          console.log(data)
        })
        .catch((error) => {
          console.error('Error updating user fund:', error);
        });
    }
    function handelSubmit(e){
        e.preventDefault()
        if (totalCost > numFund)
        {
            alert("Insufficient Funds Cannot Place order.")
            return;
        }
        
        const newOrder ={
            user_id: orderObj.user_id,
            product_id: orderObj.product_id,
            quantity: parseInt(orderObj.quantity)
        }
        
        fetch("/new-order",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(newOrder),

        })
            .then((r)=>r.json())
            .then((data)=>{
                setOrders([...orders, data])
                updateFund()
                navs("/my-orders")
            })
    }

    return (
    <div className="add-product-form">
            <h1>Add Order</h1>
            <img
            src={product.image}
            alt={product.name}
            className="product-avatar"
            />
            <p>{product.name}</p>
            <label>Quantity</label>
            <select name="quantity" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <p>Total Cost: ${totalCost}</p>
            <form onSubmit={handelSubmit}>
            <br/>
            <button type="submit">submit</button>

            </form>
        </div>
    )
}