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
import { OrderContext } from "./context/OrderContext";
import EditOrder from './components/EditOrder';


function App() {
  const {user} = useContext(UserContext)
  const {setProdcuts} = useContext(ProductContext)
  const {setOrders} = useContext(OrderContext)


  useEffect(()=>{
    fetch("/products")
    .then((r)=>r.json())
    .then(setProdcuts)
  },[user]);

  useEffect(()=>{
    fetch("/orders")
    .then((r)=>r.json())
    .then(setOrders)
  },[user]);

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
      </Routes>
    </div>
  );
}

export default App;
