import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import HeaderCategory from "../components/HeaderCategory";
import { addToCart } from '../Redux/actions/cart-actions';
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

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
                  onClick={addToCartHandler(product)}
                ><i className="fas fa-shopping-cart"></i>
                  Add To Cart
          </Link>
          </div>
      
        </div> 
    
    </>
  );
};

export default ProductDetails;
