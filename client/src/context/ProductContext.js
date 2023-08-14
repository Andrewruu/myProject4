import React, {useState} from "react";

// create the context
const ProductContext = React.createContext();

// create a provider component
function ProductProvider({ children }) {
    const [products, setProducts] = useState([])

  return <ProductContext.Provider value={{products, setProducts}}>{children}</ProductContext.Provider>;
}

export { ProductContext, ProductProvider };