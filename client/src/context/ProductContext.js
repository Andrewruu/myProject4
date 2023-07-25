import React, {useState, useEffect} from "react";

// create the context
const ProductContext = React.createContext();

// create a provider component
function ProductProvider({ children }) {
    const [products, setProdcuts] = useState([])
    

  return <ProductContext.Provider value={{products, setProdcuts}}>{children}</ProductContext.Provider>;
}

export { ProductContext, ProductProvider };