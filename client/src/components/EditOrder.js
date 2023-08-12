import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { OrderContext } from "../context/OrderContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrder(){
    const [errors, setErrors] = useState([]);
    const {user, updateUser} = useContext(UserContext)
    const {products} = useContext(ProductContext)
    const {orders, setOrders} = useContext(OrderContext)
    const {id} = useParams()
    const navs = useNavigate()
    const numFund = parseFloat(user.fund)
    const current_order = orders.find((order)=> order.id === parseInt(id))
    const [orderObj, setOrderObj] = useState({
      product_id: 0, 
      quantity: 0,   
    });
    useEffect(() => {
      if (current_order) {
        setOrderObj({
          product_id: current_order.product_id,
          quantity: parseInt(current_order.quantity),
        });
      }
    }, [current_order]);
  
    const product = products.find((product) => product.id === parseInt(current_order.product_id));
    
    const [totalCost, setTotalCost] = useState(parseFloat(product.price*orderObj.quantity).toFixed(2));
    const [updatedCost, setUpdatedCost] = useState(0)
    const originalCost = parseFloat(product.price*current_order.quantity).toFixed(2)
    
    function handleEdit(editOrder){
      setOrders(orders.map(order=>(order.id === editOrder.id? editOrder: order)))
    }
    
    function handleChange(e) {
        setOrderObj({
          ...orderObj,
          [e.target.name]: e.target.value,
        })
        const newTotalCost = parseFloat(product.price * parseInt(e.target.value));
        setUpdatedCost(parseFloat(newTotalCost-originalCost))
        setTotalCost(newTotalCost);
        console.log(orderObj.quantity)
    }

    function updateFund(){
      const newFund = numFund - updatedCost
      const updatedUser = {
        fund: newFund
      };
      updateUser(updatedUser)
    }

    
    function handleSubmit(e){
        e.preventDefault()
        if (updatedCost > numFund)
        {
            alert("Insufficient Funds Cannot Place order.")
            return;
        }
        
        const editOrder ={
            product_id: orderObj.product_id,
            quantity: parseInt(orderObj.quantity)
        }
        
        fetch(`/edit-order/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(editOrder),

        })

        .then((r) => {
            if (r.ok) {
              r.json().then((data) =>{
                handleEdit(data)
                updateFund()
                navs("/my-orders")
              })
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
            })
    }

    function handleCancel(){
        navs("/my-orders")
    }

    return (
    <div className="edit-product-form">
            <form onSubmit={handleSubmit}>
            <h1>Edit Order</h1>
            <img
            src={product.image}
            alt={product.name}
            className="product-avatar"
            />
            <p>{product.name}</p>
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
            <label>Quantity</label>
            <input type="number" name="quantity" value={`${orderObj.quantity}`} onChange={handleChange}/>

            <p>Total Cost: ${totalCost}</p>
            <br/>
            <button type="submit">Update</button>
            <button onClick={handleCancel}>cancel</button>

            </form>
        </div>
    )
}