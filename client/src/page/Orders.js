import { useContext, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { OrderContext } from "../context/OrderContext";

function Orders(){
    const {orders} = useContext(OrderContext)

    function handleRefund(){

    }

    const orderList = (orders.length>0? (
        <div>{
            orders.map((order)=> {
                return <OrderCard key={order.id} order={order} handleRefund={handleRefund}/>
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