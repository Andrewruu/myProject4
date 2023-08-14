
export default function UserOrderCard({userOrder}){
    const {user_name, user_fund} = userOrder

    return(
        <div className="card">
            
            <h2>Name: {user_name}</h2>
            <p>Funds: ${user_fund}</p>

        </div>
    )
}