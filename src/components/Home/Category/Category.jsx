import { Link } from "react-router-dom";

export default function Category() {
  return (
    <div className="container">
      <div className="row mx-5 my-5">
        <Link className="col-md-4 4 btn btn-primary text-center"   to='/SingleProducts'>
          <div style={{ margin: 25, fontSize: 25 }}>Single Product</div>
        </Link>
        <Link className="col-md-4 4 btn btn-primary text-center"  to='/DefaultProduct'>
          <div style={{ margin: 25, fontSize: 25 }}>Products</div>
        </Link>
        <Link className="col-md-4 4 btn btn-primary text-center"  to='/CustomProducts'>
          <div style={{ margin: 25, fontSize: 25 }}>Custom Product</div>
        </Link>
      </div>
    </div>
  );
}
