import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AddOrder(){
    const {user, updateUser, setUser} = useContext(UserContext)
    const {products, setProducts} = useContext(ProductContext)
    const orders = user.user_with_orders
    const {id} = useParams()
    const navs = useNavigate()
    const numFund = parseFloat(user.fund)
    const [orderObj, setOrderObj]= useState({
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

    function userOrderUpdate(){
        const newFund = numFund - totalCost;
        const currentUser = product.product_with_users.find((u) => u.user_id === user.id);
        console.log(currentUser)
        const updatedProducts = products.map((product) => {
          if (product.id == orderObj.product_id) {
            if (currentUser) {
              console.log(currentUser)
              const totalQuantity = parseInt(currentUser.total_quantity);
              const updatedTotalQuantity = totalQuantity + orderObj.quantity;
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
                }),
              };
            } else {
              return {
                ...product,
                product_with_users: [
                  ...product.product_with_users,
                  {
                    user_id: user.id,
                    user_name: user.name,
                    user_fund: newFund,
                    total_quantity: orderObj.quantity,
                  },
                ],
              };
            }
          } else {
            return product;
          }
        });
      
        console.log(updatedProducts)
        setProducts(updatedProducts);
      }

    function updateFund(){
      const newFund = numFund - totalCost
      const updatedUser = {
        fund: newFund
      };
      updateUser(updatedUser)
    }
    function handleAddOrder(newOrder){
        const updatedOrders = [...orders, newOrder]
        const updatedUser = {...user, user_with_orders:updatedOrders}
        setUser(updatedUser)
    }
    function handleSubmit(e){
        e.preventDefault()
        if (totalCost > numFund)
        {
            alert("Insufficient Funds Cannot Place order.")
            return;
        }
        
        const newOrder ={
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
                handleAddOrder(data)
                updateFund()
                userOrderUpdate()
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
            <form onSubmit={handleSubmit}>
            <br/>
            <button type="submit">Buy</button>

            </form>
        </div>
    )
}