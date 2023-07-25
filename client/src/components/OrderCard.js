import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useContext } from "react";

export default function OrderCard({order}){
    const {product_id, quantity} = order
    const {products} = useContext(ProductContext)
    const product = products.find((product) => product.id == product_id);

    const updatePrice = (
        product.price.split('.')[1].length == 2?  product.price:  product.price.concat("0")
    )

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
            
        </div>
    )
}