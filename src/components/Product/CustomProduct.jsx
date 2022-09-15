import SingleProduct from "../Product/SingleProduct/SingleProduct";
import Category from "../Home/Category/Category";
import Topbar from "../Home/Topbar/Topbar";
import Slider from "../Home/Slider/Sliders";
import Navbar from "../Home/Navbar/Navbar";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
export default function CustomProducts() {
  const [product, setProduct] = useState([]);
  const {user} = useAuth()
  let totalP = []
  let sum = 0
  const productRef = useRef([])
  useEffect(() => {

    axios.get('http://85.214.102.236:3000/product/allUserProduct').then(prd=>{
        setProduct(prd.data.userProduct)
    })
  }, []);
  const productCalcHandler = async (gram,price,title,index,e) => {  
    let totalPrice = (productRef.current[index].value / gram) * price
    if (totalP[index]) {
      totalP.forEach((item,itemId)=>{
        if(item.id === index) {
          totalP[itemId].total = totalPrice 
        }
      })
         for(let i=0;i<totalP.length;i++) {
          if(totalP[i].id === index) {
            totalP.splice(i,1);
          }
         }
    }
    document.getElementById(`totalPrice${index}`).innerText = totalPrice
    totalP.push({ id: index, total: totalPrice })
    sum = getSumByKey(totalP,'total')
    document.getElementById('sum').innerText = sum+' ₺'
  }
  const clickHandler = async (id) => {
    let title = []
    let gram = []
    let desc = ""
    console.log(sum)
    for(let i=0;i<productRef.current.length;i++) {
       title[i] = productRef.current[i].name
       gram[i] = productRef.current[i].value
       desc += title[i]+ ' ' + gram[i] + ' gram, '
    }
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
    const userProductBasket = await axios.post('http://85.214.102.236:3000/product/addUserProductBasket',{
    id:id,
    email:user.data.data[0].email,
    price:sum,
    quantity:1,
    description:desc
    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    
    
  console.log(userProductBasket)
  }
  const getSumByKey = (arr, key) => {
    return arr.reduce((accumulator, current) => accumulator + Number(current[key]), 0)
  }
  
  return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>
      <Slider></Slider>
      <Category></Category>
      {product.map(item=>(
        <div className="pd-wrap" key={item._id} >
        <div className="container">
            
            <div className="row" style={{marginLeft: "50px"}}>
                <div className="col-md-12">
                    <div className="product-dtl">
                        <div className="product-info">
                            <div className="product-price-discount text-center"><span id="sum"></span>
                            </div>
                        </div>
                        <p>{item.description}</p>
                        {item.category.map((cat,index)=>(
                            <div className="row mb-2" key={index}>
                                <div className="col-md-4">
                                    <label>{cat.title} gram/{cat.gram} </label>
                                    <input min="0"  ref={el=>productRef.current[index] = el}   onChange={(e)=>productCalcHandler(cat.gram,cat.price,cat.title,index,e)} step={cat.gram} name={cat.title}  key={index} className="form-control" style={{color:"#1C1C1C"}} type="number"/>
                                </div>
                                <div className="col-md-4">
                                    <label>{cat.title} unit price</label>
                                    <p className="form-control"  key={index}  style={{color:"#1C1C1C",backgroundColor:"#e9ecef"}} id={"totalPrice"+index}></p>
                                </div>
                                <div className="col-md-4">
                                    <label>price</label>
                                    <p className="form-control"  key={index}  style={{color:"#1C1C1C",backgroundColor:"#e9ecef"}} type="number">{cat.price}</p>
                                </div>
                    
                            </div>    
                        ))
                        }
                        {user ? 
                        <div className="product-count">
                        <button onClick={()=>clickHandler(item._id)}  className="btn btn-primary btn-lg mt-4">Add to Cart</button>
                      </div>:
                      <div className="product-count">
                            <button onClick={()=>clickHandler()}  disabled className="btn btn-primary btn-lg mt-4">Please Sign Up</button>
                        </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
      ))}
    </>
  );
}
