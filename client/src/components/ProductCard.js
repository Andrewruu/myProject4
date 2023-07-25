import { Link } from "react-router-dom";

export default function ProductCard({product}){
    const {id, name, image, description, price} = product
    
    const updatePrice = parseFloat(price).toFixed(2)

    return(
        <div className="card">
            
            <h2>{name}</h2>
            <img
            src={image}
            alt={name}
            className="product-avatar"
            />
            <p>{description}</p>
            <h3>${updatePrice}</h3>
            <Link to={`/new-order/${id}`} ><button>buy</button></Link>
            
        </div>
    )
}