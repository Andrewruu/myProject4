import React, {useContext, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { UserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Access from './page/Access';
import Product from './page/Product';
import AddOrder from './components/AddOrder';
import Orders from './page/Orders';
import { ProductContext } from "./context/ProductContext";
import EditOrder from './components/EditOrder';
import AddProduct from './components/AddProduct';
import UserOrders from './page/UserOrders';
import EditProduct from './components/EditProduct';

function App() {
  const {user} = useContext(UserContext)
  const {products, setProducts} = useContext(ProductContext)
  

  useEffect(()=>{
    fetch("/products")
    .then((r)=>r.json())
    .then(setProducts)
  },[]);


  if (!user){
    return <Access/>
  }

  return (

    <div className="App">
      <NavBar/>
      <Routes>
          <Route 
              path="/" 
              element={<Product/> }/>
          <Route
              path="/new-order/:id"
              element={<AddOrder/>}/>
          <Route
              path='/my-orders'
              element={<Orders/>}/>
          <Route 
              path='/edit-order/:id'
              element={<EditOrder/>}/>
          <Route 
              path='/add-product'
              element={<AddProduct/>}/>
          <Route 
              path='/edit-product/:id'
              element={<EditProduct/>}/>
          <Route 
              path='/product-orders/:id'
              element={<UserOrders/>}/>
      </Routes>
    </div>
  );
}

export default App;
