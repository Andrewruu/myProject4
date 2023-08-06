import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function OrderCard({order, handleRefund}){
    const {product_id, quantity} = order
    const {user, updateUser} = useContext(UserContext)
    const {products} = useContext(ProductContext)
    const product = products.find((product) => product.id == product_id);

    const totalPrice = product.price * quantity
    const updatePrice = totalPrice.toFixed(2)

    const numFund = parseFloat(user.fund)
    
    function updateFund(){
        const newFund = numFund + parseFloat(updatePrice)
        const updatedUser = {
          fund: newFund
        };

        updateUser(updatedUser)
    }



    function removeOrder(){

        fetch(`/order-refund/${order.id}`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(res=>res.json())
        .then(()=>{
            handleRefund(order)
            updateFund()
        })
  
    }

    return(
        <div className="card">
            
            <h2>{product.name}</h2>
            <img
            src={product.image}
            alt={product.description}
            className="product-avatar"
            />
            <p>Quantity: {quantity}</p>
            <p>Total Cost: ${updatePrice}</p>
            <Link to={`/edit-order/${order.id}`} ><button >Edit Order</button></Link>
            <button className={'refund'} onClick={removeOrder}>Refund</button>
        </div>
    )
}