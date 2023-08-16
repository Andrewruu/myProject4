import { Link } from "react-router-dom";

export default function ProductCard({product, handleRemove}){
    const {id, name, image, description, price} = product
    
    const updatePrice = parseFloat(price).toFixed(2)

    function handleDelete(){
        fetch(`/products/${id}`,{
            method: 'DELETE',
            headers:{
            'Content-Type':'application/json'
          }
        })
        .then(res=>res.json())
        .then(()=>{
            handleRemove(product)
        })
        
    }
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
            <Link to={`/product-orders/${id}`} ><button>view orders</button></Link>
            {/* <button onClick={handleDelete}>delete</button> */}
        </div>
    )
}