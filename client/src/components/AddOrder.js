import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import { useParams } from "react-router-dom";

export default function AddOrder(){
    const {user} = useContext(UserContext)
    const {products} = useContext(ProductContext)
    const {orders, setOrders} = useContext(OrderContext)
    const {id} = useParams()

    const [orderObj, setOrderObj]= useState({
        user_id: user.id,
        product_id: id,
        quantity: 1
    })
    const product = products.find((product) => product.id === parseInt(id));
    
    const [totalCost, setTotalCost] = useState(parseInt(product.price));
  
    function handleChange(e) {
        setOrderObj({
          ...orderObj,
          [e.target.name]: e.target.value,
        })
        const newTotalCost = product.price * parseInt(e.target.value);
        setTotalCost(newTotalCost);
    }

    function handelSubmit(e){
        e.preventDefault()
        if (totalCost > user.fund)
        {
            alert("Insufficient Funds Cannot Place order.")
            return;
        }
        const updatedUser = { ...user, fund: user.fund - totalCost };

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
          })
          .catch((error) => {
            console.error('Error updating user fund:', error);
          });


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
                console.log(orders)
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