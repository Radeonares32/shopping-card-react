import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Order() {
  const [buy, setBuy] = useState([]);
  const [adminBuy, setAdminBuy] = useState([]);
  const [userProductBuy, setUserProductBuy] = useState([]);
  useEffect(() => {
    axios
      .get("http://85.214.102.236:3000/user/getTokenUser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      })
      .then((user) => {
        console.log(user);
        setBuy(user.data.data[0].buy);
        setAdminBuy(user.data.data[0].adminBuy);
        setUserProductBuy(user.data.data[0].userProductbuy);
      });
  }, []);
  return (
    <>
      <Topbar></Topbar>
      <Navbar></Navbar>

      <div className="col-lg-9 col-md-12" key={buy._id}>
        <div className="row pb-3">
          {userProductBuy &&
            userProductBuy.map((buy) => (
              <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border border-5  border-primary mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={"http://85.214.102.236:3000/public/" + buy.image}
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{buy.title}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>${buy.price}</h6>
                      <h6 className="text-muted ml-2"></h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border"></div>
                </div>
              </div>
            ))}

          {adminBuy &&
            adminBuy.map((buy) => (
              <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border border-5  border-primary mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={"http://85.214.102.236:3000/public/" + buy.image}
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{buy.title}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>${buy.price}</h6>
                      <h6 className="text-muted ml-2"></h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border"></div>
                </div>
              </div>
            ))}

          {buy &&
            buy.map((buy) => (
              <div className="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border border-5  border-primary mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={"http://85.214.102.236:3000/public/" + buy.image}
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{buy.title}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>${buy.price}</h6>
                      <h6 className="text-muted ml-2"></h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
