import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const singleProductRef = useRef([])
  const defaultProductRef = useRef([])
  const customProductRef = useRef([])
  const [products, setProducts] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [adminProduct, setAdminProduct] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://85.214.102.236:3000/user/getTokenUser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      })
      .then((prd) => {
        setProducts(prd.data.data[0].products);
        setAdminProduct(prd.data.data[0].adminProduct);
        setUserProduct(prd.data.data[0].userProduct);
      });
      
  },);
  const singleProductHandler = async (e,price,id,index) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const product= await axios.post('http://85.214.102.236:3000/product/productAddBasket',{
    email:user.data.data[0].email,
    id:id,
    quantity:singleProductRef.current[index].value

    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
  }
  const customProductHandler = async (e,price,id,index,description) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
    const userProductBasket = await axios.post('http://85.214.102.236:3000/product/addUserProductBasket',{
    id:id,
    email:user.data.data[0].email,
    price:price,
    quantity:customProductRef.current[index].value,
    description:description
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
  }
  const customProductDeleteHandler = async (id) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const userProductDelete = await axios.get(`http://85.214.102.236:3000/product/deleteUserProductBasket/${id}/${user.data.data[0].email}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}`, 
    },
       
    })
  }
  const singleProductDeleteHandler = async (id) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const userProductDelete = await axios.get(`http://85.214.102.236:3000/product/deleteProductBasket/${id}/${user.data.data[0].email}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}`, 
    },
    })
  }
  const defaultProductDeleteHandler = async (id) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const userProductDelete = await axios.get(`http://85.214.102.236:3000/product/deleteAdminProductBasket/${id}/${user.data.data[0].email}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}`, 
    },
    })
  }
  const defaultProductHandler = async (id,index) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const defaultProduct = await axios.post('http://85.214.102.236:3000/product/adminProductAddBasket',{
      email:user.data.data[0].email,
      id:id,
      quantity:defaultProductRef.current[index].value
  
      },{
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
      })
  }
  const checkOutHandler = async () => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const checkOut = await axios.post('http://85.214.102.236:3000/product/postPayment',{
      email:user.data.data[0].email
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    window.location.href=checkOut.data.payment.url
  }
   return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>

              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
          {userProduct &&userProduct.map((prd,index)=>(
            <tr key={prd._id}>
            <td data-th="Product">
              <div className="row">
                <div className="col-sm-2 hidden-xs">
                  <img
                    src={"http://85.214.102.236:3000/public/" + prd.image}
                    alt="..."
                    className="img-responsive w-100"
                  />
                </div>
                <div className="col-sm-10">
                  <h4 className="nomargin">{prd.title}</h4>
                  <p>{prd.description}</p>
                </div>
              </div>
            </td>
            <td data-th="Price">{prd.price}₺</td>
            <td data-th="Quantity">
              <input
                type="number"
                min="1"
                onChange={e=>customProductHandler(e,prd.price,prd._id,index,prd.description)}
                ref={el=>customProductRef.current[index] = el}
                defaultValue={prd.quantity}
                className="form-control text-center"
              />
            </td>

            <td className="actions" data-th="">
              <button  onClick={()=>customProductDeleteHandler(prd._id)} className="btn btn-danger btn-sm mt-1">
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
          ))}
              
           
            {products &&
              products.map((prd, index) => (
                <tr key={index}>
                  <td data-th="Product">
                    <div className="row">
                      <div className="col-sm-2 hidden-xs">
                        <img
                          src={"http://85.214.102.236:3000/public/" + prd.image}
                          alt="..."
                          className="img-responsive w-100"
                        />
                      </div>
                      <div className="col-sm-10">
                        <h4 className="nomargin">{prd.title}</h4>
                        <p>{prd.description}</p>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">{prd.price}₺</td>
                  <td data-th="Quantity">
                    <input
                      type="number"
                      min="1"
                      defaultValue={prd.quantity}
                      ref={el=>singleProductRef.current[index] = el}
                      onChange={e=>singleProductHandler(e,prd.price,prd._id,index)}
                      className="form-control text-center"
                    />
                  </td>

                  <td className="actions" data-th="">
                    <button onClick={()=>singleProductDeleteHandler(prd._id)} className="btn btn-danger btn-sm mt-1">
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            {adminProduct &&
              adminProduct.map((prd, index) => (
                <tr key={index}>
                  <td data-th="Product">
                    <div className="row">
                      <div className="col-sm-2 hidden-xs">
                        <img
                          src={"http://85.214.102.236:3000/public/" + prd.image}
                          alt="..."
                          className="img-responsive w-100"
                        />
                      </div>
                      <div className="col-sm-10">
                        <h4 className="nomargin">{prd.title}</h4>
                        <p>{prd.description}</p>
                      </div>
                    </div>
                  </td>
                  <td data-th="Price">{prd.price}₺</td>
                  <td data-th="Quantity">
                    <input
                      type="number"
                      min="1"
                      defaultValue={prd.quantity}
                      ref={el=>defaultProductRef.current[index] = el}
                      onChange={()=>defaultProductHandler(prd._id,index)}
                      className="form-control text-center"
                    />
                  </td>

                  <td className="actions" data-th="">
                    <button  onClick={()=>defaultProductDeleteHandler(prd._id)} className="btn btn-danger btn-sm mt-1">
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
           
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <strong>Total $ 5.11</strong>
              </td>
              <td>
                <button  onClick={()=>checkOutHandler()} className="btn btn-primary btn-block">
                  Checkout <i className="fa fa-angle-right"></i>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
