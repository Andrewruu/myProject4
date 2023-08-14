
export default function UserOrderCard({userOrder}){
    const {user_name, user_fund, total_quantity} = userOrder

    return(
        <div className="card">
            
            <h2>Name: {user_name}</h2>
            <p>Funds: ${user_fund}</p>
            <p>ordered: {total_quantity}</p>

        </div>
    )
}