import React, {useState, useEffect} from "react";

// create the context
const ProductContext = React.createContext();

// create a provider component
function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [userOrders, setUserOrders] = useState([])

    function getOrders(id)
    {
      fetch(`/product-orders/${id}`)
      .then((r) => {
        if (r.ok)
          r.json().then((data)=> setUserOrders(data))
      })
    }

  return <ProductContext.Provider value={{products, setProducts, getOrders, userOrders}}>{children}</ProductContext.Provider>;
}

export { ProductContext, ProductProvider };