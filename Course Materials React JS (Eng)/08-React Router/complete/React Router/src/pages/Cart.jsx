import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  return (
    <div>
      Cart Page
      {/* <Link to={"/thanks"}>
        <button>order</button>
      </Link> */}
      <button onClick={() => navigate("/thanks")}>order</button>
    </div>
  );
}

export default Cart;
