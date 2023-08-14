import { useContext, useEffect} from "react";
import { ProductContext } from "../context/ProductContext";
import UserOrderCard from "../components/UserOrderCard";
import { useParams } from "react-router-dom";

function UserOrders(){
    const {products} = useContext(ProductContext)
    const {id} = useParams()
    console.log("product is")
    console.log(products)
    const product = products.find( p => p.id === parseInt(id))
    if (!product){
        return<h1>Product not found!</h1>
    }
    console.log(product)
    const userOrders = product.product_with_users
    console.log(product.product_with_users)

    const userOrdersList = (userOrders.length>0? (
        <div>{
            userOrders.map((userOrder)=> {
                return <UserOrderCard key={userOrder.user_id} userOrder={userOrder}/>
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