import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";
export default function Success() {
  return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-6 col-sm-offset-3">
            <br />
            <br /> <h2 style={{color:"#0fad00"}}>Success</h2>
            <img src="http://osmhotels.com//assets/check-true.jpg" />
            <h3>Payment Success</h3>
            <p style={{fontSize:"20px",color:"#5C5C5C"}}>
              Thank you
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
