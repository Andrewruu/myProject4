import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function OrderCard({order, handleRefund}){
    const {product_id, quantity} = order
    const {user, updateUser} = useContext(UserContext)
    const {products, setProducts} = useContext(ProductContext)
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

    function userOrderUpdate() {
      const newFund = numFund + updatePrice;
      const currentUser = product.product_with_users.find((u) => u.user_id == user.id);
      const totalQuantity = parseInt(currentUser.total_quantity);
      const updatedProducts = products.map((product) => {
        if (product.id === order.product_id) {
          const updatedTotalQuantity = totalQuantity - quantity;
          if (updatedTotalQuantity <= 0) {
            return {
              ...product,
              product_with_users: product.product_with_users.filter((u) => u.user_id !== user.id)
            };
          } else {
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
          }
        } else {
          return product;
        }
      });
    
      setProducts(updatedProducts);
    }


    function removeOrder(){

        fetch(`/user_products/${order.user_product_id}`,
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
            userOrderUpdate()
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
            <Link to={`/edit-order/${order.user_product_id}`} ><button >Edit Order</button></Link>
            <button className={'refund'} onClick={removeOrder}>Refund</button>
        </div>
    )
}