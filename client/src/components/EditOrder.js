import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrder(){
    const [errors, setErrors] = useState([]);
    const {user, updateUser, setUser} = useContext(UserContext)
    const {products, setProducts} = useContext(ProductContext)
    const orders = user.user_with_orders

    const {id} = useParams()
    const navs = useNavigate()
    const numFund = parseFloat(user.fund)
    const current_order = orders.find((order)=> order.user_product_id === parseInt(id))
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
      const updatedOrders = orders.map(order=>(order.user_product_id === editOrder.user_product_id? editOrder: order))
      const updateUser = {...user, user_with_orders: updatedOrders}
      setUser(updateUser)
    }

    function handleChange(e) {
        setOrderObj({
          ...orderObj,
          [e.target.name]: e.target.value,
        })
        const newTotalCost = parseFloat(product.price * parseInt(e.target.value));
        setUpdatedCost(parseFloat(newTotalCost-originalCost))
        setTotalCost(newTotalCost);

    }

    function updateFund(){
      const newFund = numFund - updatedCost
      const updatedUser = {
        fund: newFund
      };
      updateUser(updatedUser)
    }
    
    function userOrderUpdate(){
      const newFund = numFund - updatedCost
      const currentUser = product.product_with_users.find((u)=> u.user_id == user.id)
      const quantityChange = current_order.quantity - orderObj.quantity
      const totalQuantity = parseInt(currentUser.total_quantity)
      const updatedProducts = products.map((product) => {
        if (product.id === orderObj.product_id) {
          const updatedTotalQuantity = totalQuantity - quantityChange;
          return {
            ...product,
            product_with_users: product.product_with_users.map((u) => {
              if (u.user_id === user.id) {
                return {
                  ...u,
                  user_fund: newFund,
                  total_quantity: updatedTotalQuantity,
                };
              } else {
                return u;
              }
            })
          };
        } else {
          return product;
        }
      });

      setProducts(updatedProducts)
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
            quantity: orderObj.quantity
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
                userOrderUpdate()
                navs("/my-orders")
              })
            } else {
              r.json().then((err) => {

                setErrors(err.errors)});
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