import SingleProduct from "../Product/SingleProduct/SingleProduct";
import Category from "./Category/Category";
import Navbar from "./Navbar/Navbar";
import Slider from "./Slider/Sliders";
import Topbar from "./Topbar/Topbar";

export default function Home() {
  return (
    <>
    <Topbar></Topbar>
    <Navbar></Navbar>
    <Slider></Slider>
    <Category></Category>
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <div className="col-lg-1 col-md-1"></div>
             <SingleProduct></SingleProduct>
      </div>
    </div>
    </>
  );
}
