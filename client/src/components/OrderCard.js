import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export default function OrderCard({order}){
    const {product_id, quantity} = order
    const {products} = useContext(ProductContext)
    const product = products.find((product) => product.id == product_id);

    console.log(product)
    console.log(product_id)
    console.log("Q")
    console.log(quantity)
    const totalPrice = product.price * quantity
    const updatePrice = totalPrice.toFixed(2)

    
    return(
        <div className="card">
            
            <h2>{product.name}</h2>
            <img
            src={product.image}
            alt={product.name}
            className="product-avatar"
            />
            <p>{product.description}</p>
            <p>{quantity}</p>
            <p>Total Cost: ${updatePrice}</p>
            
        </div>
    )
}