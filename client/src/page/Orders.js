import { useContext } from "react";
import OrderCard from "../components/OrderCard";
import { UserContext } from "../context/UserContext";
function Orders(){
    const {user, setUser} = useContext(UserContext)
    const orders = user.user_with_orders

    function handleRefund(order){
        const updatedOrders = orders.filter(o => o.user_product_id !== order.user_product_id)
        const updateUser = {...user, user_with_orders: updatedOrders}
        setUser(updateUser)
    }
    const orderList = (orders.length>0? (
        <div>{
            orders.map((order)=> {
                return <OrderCard key={order.user_product_id} order={order} handleRefund={handleRefund}/>
            })
            }
        </div>
    ): <h1>No orders</h1>)

    return(
        <div>
            <h1>My Orders</h1>
            {orderList}
        </div>
    )
}
export default Orders;