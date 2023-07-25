import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

function Product(){
    const {products, setProdcuts} = useContext(ProductContext)
    
    // useEffect(()=>{
    //     fetch("/products")
    //     .then((r)=>r.json())
    //     .then(setProdcuts)
    // },[]);

    const productList = (products.length>0? (
        <div>{
            products.map((product)=> {
                return <ProductCard key={product.id} product={product}/>
            })
            }
        </div>
    ): <h1>No Products</h1>)

    return(
        <div>
            <h1>Products to buy</h1>
            {productList}
        </div>
    )
}
export default Product;