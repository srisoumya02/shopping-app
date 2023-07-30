import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHeart } from "@fortawesome/free-solid-svg-icons";
import HeaderCategory from "../components/HeaderCategory";
import { addToCart } from '../Redux/actions/cart-actions';
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from '../Redux/actions/wishlist-actions';


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
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
  const handleWishlistClick = (productId) => {
    if (wishlist[productId]) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Navbar />
      <HeaderCategory />
      <div className="row ordersummary" style={{ border: "solid lightgrey",margin:"40px",height:"400px" }}>
        <div className="col-sm-3">
        <img
          src={product.image}
          alt=""
          className="img-fluid"
          style={{ height: "200px", maxWidth: "200px",margin:"30px"}}
        />
        </div>
        
        <div className="col-sm-7" style={{ margin:"20px"}} >
          <h3>Brand</h3>
          <div className="wishlist">
              <FontAwesomeIcon
                  icon={faHeart}
                  className={`wishlist-icon ${wishlist[product.id] ? "wishlist-added" : ""}`}
                  onClick={() => handleWishlistClick(product.id)}
                  style={{ color: wishlist[product.id] ? "pink" : "grey" ,cursor: "pointer",
                  position: "absolute",
                  right: "10px",}}
                  
                />
              </div>
          <h5 style={{ fontSize: "22px", marginLeft: "10px", color: "grey" }}>
            {product.title}
          </h5>
          <p style={{ fontSize: "22px", marginLeft: "10px", color: "grey" }}>
            {product.description}
          </p>
          <h2 style={{ fontSize: "22px", marginLeft: "10px", color: "grey" }}>
            <span>&#36;</span>
            {product.price}
          </h2>
          <Link
            className="btn btn-primary"
            style={{ width: "250px", height: "40px" }}
            onClick={() => addToCartHandler(product)}
          >
            <i className="fas fa-shopping-cart"></i>
            Add To Cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
