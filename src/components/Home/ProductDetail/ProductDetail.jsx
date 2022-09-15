import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Category from "../Category/Category";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Sliders";
import Topbar from "../Topbar/Topbar";


export default function ProductDetail() {
    const {id} = useParams()
    const {user} = useAuth()
    const [product,setProduct] = useState([])
    const [quantity,setQuantity] = useState(0)
    useEffect(()=>{
        axios.get('http://85.214.102.236:3000/product/getProductDetail/'+id).then(prd=>{
            setProduct(prd.data.product)
        })
    },[])
    const clickHandler = async (id)=> {
        const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const product= await axios.post('http://85.214.102.236:3000/product/productAddBasket',{
    email:user.data.data[0].email,
    id:id,
    quantity:quantity

    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
    }
  return (
    <>
    <Topbar></Topbar>
    <Navbar></Navbar>
   {product.map((item,index)=>(
    <div className="container-fluid py-5 mt-5" key={index}>
        <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">

                <div className="carousel-item active">
                    <img className="w-100 h-100" src= {"http://85.214.102.236:3000/public/"+item.image} alt="Image"/>
                </div>

            </div>

            <div className="col-lg-7 pb-5">
                <h3 className="font-weight-semi-bold">{item.title}</h3>
                <h3 className="font-weight-semi-bold mb-4">{item.price}</h3>
                <p className="mb-4">{item.description}</p>

                <div className="d-flex align-items-center mb-4 pt-2">
                    <div className="input-group quantity mr-3" style={{width: "130px"}}>
            
                        <input onChange={e=>setQuantity(e.target.value)} type="number" min="0" className="form-control bg-secondary text-center" />
                        
                    </div>
                    {user ?
                    <button onClick={()=>clickHandler(item._id)} className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                    :
                    <button disabled className="btn btn-primary px-3"><i className="fa fa-shopping-cart mr-1"></i>Please Sign Up</button>
                    }
                   
                </div>
            </div>
        </div>
    </div>
   ))}
    
    </>
  );
}
