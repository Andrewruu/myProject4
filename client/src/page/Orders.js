import { useContext, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { OrderContext } from "../context/OrderContext";

function Orders(){
    const {orders} = useContext(OrderContext)

    console.log(orders)
    const orderList = (orders.length>0? (
        <div>{
            orders.map((order)=> {
                return <OrderCard key={order.id} order={order}/>
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