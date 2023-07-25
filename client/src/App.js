import React, {useContext} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { UserContext } from './context/UserContext';
import NavBar from './components/NavBar';
import Access from './page/Access';
import Product from './page/Product';
import AddOrder from './components/AddOrder';
import Orders from './page/Orders';

function App() {
  const {user, setUser} = useContext(UserContext)
  console.log(user)

  if (!user){
    return <Access/>
  }

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
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
      </Routes>
    </div>
  );
}

export default App;
