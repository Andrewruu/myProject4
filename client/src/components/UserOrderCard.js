import { Link } from "react-router-dom";

export default function UserOrderCard({userOrder}){
    const {name, username, fund} = userOrder

    return(
        <div className="card">
            
            <h2>Name: {name}</h2>
            <h3>UserName: {username}</h3>
            <p>Funds: ${fund}</p>

        </div>
    )
}