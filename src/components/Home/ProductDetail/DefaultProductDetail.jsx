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
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    axios
      .get("http://85.214.102.236:3000/product/getAdminProductDetail/" + id)
      .then((prd) => {
        setProduct(prd.data.adminProduct);
        setCategory(prd.data.adminProduct.category)
      });
  }, []);
  const clickHandler = async (id) => {
    const user = await axios.get('http://85.214.102.236:3000/user/getTokenUser',{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    const product= await axios.post('http://85.214.102.236:3000/product/adminProductAddBasket',{
    email:user.data.data[0].email,
    id:id,
    quantity:quantity

    },{
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
    })
    console.log(product)
    
  }
  return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>

      <div className="container-fluid py-5 mt-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div className="carousel-item active">
              <img
                className="w-100 h-100"
                src={"http://85.214.102.236:3000/public/" + product.image}
                alt="Image"
              />
            </div>
          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.title}</h3>
            <h3 className="font-weight-semi-bold mb-4">{product.price}</h3>
            <p className="mb-4">{product.description}</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Gram</th>
                </tr>
              </thead>
              <tbody>
              { category &&category.map((item,index)=>(
                <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.gram}</td>
                </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div
                className="input-group quantity mr-3"
                style={{ width: "130px" }}
              >
                <input
                  type="number"
                  min="0"
                  className="form-control bg-secondary text-center"
                  onChange={e=>setQuantity(e.target.value)}
                />
              </div>
              {user ? (
                <button className="btn btn-primary px-3" onClick={()=>clickHandler(product._id)} >
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              ) : (
                <button disabled className="btn btn-primary px-3">
                  <i className="fa fa-shopping-cart mr-1"></i>Please Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
