import { useContext, useEffect} from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";


function UserOrders(){
    const {getOrders, userOrders} = useContext(ProductContext)
    
    const {id} = useParams()
    useEffect(()=>{
        getOrders(id)
    }, [id]);
    
    const userOrdersList = (userOrders.length>0? (
        <div>{
            userOrders.map((userOrder)=> {
                return <UserOrderCard key={userOrder.id} userOrder={userOrder}/>
            })
            }
        </div>
    ): <h1>No User Orders</h1>)

    return(
        <div>
            <h1>Users that ordred the product</h1>
            {userOrdersList}
        </div>
    )
}
export default UserOrders;