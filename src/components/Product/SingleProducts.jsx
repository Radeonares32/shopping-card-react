import SingleProduct from "../Product/SingleProduct/SingleProduct";
import Category from "../Home/Category/Category";
import Topbar from "../Home/Topbar/Topbar";
import Slider from "../Home/Slider/Sliders";
import Navbar from "../Home/Navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
export default function SingleProducts() {
  const [product, setProduct] = useState([]);
  const {user} = useAuth()
  useEffect(() => {
    axios.get("http://85.214.102.236:3000/product/allProduct").then((prd) => {
        setProduct(prd.data.products)
    });
  }, []);
  const clickHandler = async (id) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const product= await axios.post('http://85.214.102.236:3000/product/productAddBasket',{
    email:user.data.data[0].email,
    id:id,
    quantity:1

    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
  }
  return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>
      <Slider></Slider>
      <Category></Category>
      <div className="container-fluid pt-5">
      <div className="row px-xl-5">
          <div className="col-lg-1 col-md-1"></div>

          {product ? 
            product.map(prd=>(
                <div className="col-lg-9 col-md-12" key={prd._id}>
                <div className="row pb-3">
                  <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <div className="card product-item border border-5  border-primary mb-4">
                      <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img
                          className="img-fluid w-100"
                          src= {"http://85.214.102.236:3000/public/"+prd.image}
                          alt=""
                        />
                      </div>
                      <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 className="text-truncate mb-3">
                         {prd.title}
                        </h6>
                        <div className="d-flex justify-content-center">
                          <h6>${prd.price}</h6>
                          <h6 className="text-muted ml-2"></h6>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between bg-light border">
                      <Link to={"../SingleProductDetail/"+prd._id}
                         
                         className="btn btn-sm text-dark p-0"
                       >
                         <i className="fas fa-eye text-primary mr-1"></i>View
                         Detail
                       </Link>
                       {user ? 
                        <button
                         onClick={()=>clickHandler(prd._id)}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-shopping-cart text-primary mr-1"></i>
                        Add To Cart
                      </button>

                      :
                      <button
                         disabled
                          className="btn btn-sm text-dark p-0"
                        >
                          <i className="fas fa-shopping-cart text-primary mr-1"></i>
                          Please Sign Up
                        </button>
                      }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
           : (
            <div className="col-lg-9 col-md-12">
              <div className="row pb-3">
                <div className="col-lg-4 col-md-6 col-sm-12 pb-1">No Product</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
