import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderCategory from "../components/HeaderCategory";
import { selectCartItems, selectProductData } from "../Redux/selectors/cartSelectors";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  // const cartItems = useSelector(selectCartItems);
  // const [product, setProduct] = useSelector(selectProductData);
  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Endpoints.PRODUCTS_URL + id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <HeaderCategory />
      <div className="rowordersummary" style={{ border: "solid lightgrey" }}>
      
        <img
          src={product.image}
          alt=""
          className="img-fluid"
          style={{  height: "200px", maxWidth: "200px" }}
        />
        <div className="col-sm-8" >
          <h3>Brand</h3>
          {/* <FontAwesomeIcon
            icon={faTrash}
            // onClick={() => handleDelete(product.id)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          /> */}
          <h5 style={{ fontsize: "22px", marginleft: "10px", color: "grey" }}>
            {product.title}
          </h5>
          <p>
            {product.description}
          </p>
          <h2 style={{ fontsize: "22px", marginleft: "10px", color: "grey" }}>
            <span>&#36;</span>
            {product.price}
          </h2>
          <Link
          className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  // onClick={addToCartHandler}
                ><i className="fas fa-shopping-cart"></i>
                  Add To Cart
          </Link>
          </div>
         
        
        {/* <div className="col-sm-3">
          <h5>Order Summary</h5>
          <table style={{ marginTop: "20px" }}>
            <tbody>

              <tr key={product.id}>
                <td>SubTotal</td>
                <td>
                  <span>&#36;</span>
                  {product.price}
                </td>
              </tr>

              <tr>
                <td>ShoppingEstimate</td>
                <td>
                  <span>&#36;</span>5
                </td>
              </tr>
              <tr>
                <td>TaxEstimate</td>
                <td>
                  <span>&#36;</span>5
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Order Total</h6>
                </td>
                <td>
                  <h6>
                    <span>&#36;</span>
                    {product.price + 5 + 5}
                  </h6>
                </td>
              </tr>
            </tbody>
          </table>*/}
        </div> 
    
    </>
  );
};

export default ProductDetails;
