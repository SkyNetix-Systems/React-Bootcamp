import { useParams } from "react-router-dom";

function ProductDetails() {
  const { pruductsID } = useParams();

  return (
    <div>
      <p>ProductDetails Page</p>

      <p>Product param: {pruductsID}</p>
    </div>
  );
}

export default ProductDetails;
