import { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import SingleProduct from './components/Product/SingleProduct/SingleProduct'
import Login from './components/User/Login/Login'
import Logout from './components/User/Logout'
import Register from './components/User/Register/Register'
import DefaultProduct from './components/Product/DefaultProduct'
import SingleProducts from './components/Product/SingleProducts'
import CustomProducts from './components/Product/CustomProduct'
import ProductDetail from './components/Home/ProductDetail/ProductDetail'
import DefaultProductDetail from './components/Home/ProductDetail/DefaultProductDetail'
import Checkout from './components/Home/Checkout/Checkout'
import Success from './components/Home/Payment/Success'
import Order from './components/Home/Orders/Orders'

function App() {


  return (
    <div >
     <Routes>
      <Route path='/' element={<Home></Home>} ></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
      <Route path='/DefaultProduct' element={<DefaultProduct></DefaultProduct>}></Route>
      <Route path='/SingleProducts' element={<SingleProducts></SingleProducts>}></Route>
      <Route path='/CustomProducts' element={<CustomProducts></CustomProducts>}></Route>
      <Route path='SingleProductDetail'>
        <Route path=':id' element={<ProductDetail></ProductDetail>} ></Route>
      </Route>
      <Route path='DefaultProductDetail'>
      <Route path=':id' element={<DefaultProductDetail></DefaultProductDetail>} ></Route>
      </Route>
      <Route path='Checkout' element={<Checkout></Checkout>}></Route>
      <Route path='/success' element={<Success></Success>}></Route>
      <Route path='/orders' element={<Order></Order>}></Route>
     </Routes>
    
    </div>
  )
}

export default App
