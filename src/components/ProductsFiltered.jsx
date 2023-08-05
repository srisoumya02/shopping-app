import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Endpoints from "../apis/Endpoints";
import Navbar from "./Navbar";
import HeaderCategory from "./HeaderCategory";
import { addToCart } from '../Redux/actions/cart-actions';
import { addToWishlist, removeFromWishlist } from '../Redux/actions/wishlist-actions';


const ProductsFiltered = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [loginStatus, setLoginStatus] = useState(false);



  useEffect(() => {
      let token = localStorage.getItem("token");
      if (!token) {
          setLoginStatus(false);
      } else {
          setLoginStatus(true);
      }
  }, [loginStatus]);

  useEffect(() => {
    if (category === undefined || category === "All") {
      // Fetch all products when no category is selected
      axios
        .get(Endpoints.PRODUCTS_URL)
        .then((response) => {
          setFilteredProducts(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      // Fetch products for the selected category from the API
      axios
        .get(Endpoints.CATEGORY_URL + category)
        .then((response) => {
          setFilteredProducts(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [category]);

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

      <div className="row" style={{ margin: "40px" }}>
        {filteredProducts.map((product) => (
          <div className="col-sm-3" key={product.id} >
            <ul className="card" style={{ padding: "0px", width: "300px", height: "600px", gap: "10px" }}>
            <div style={{ maxWidth: "200px", maxHeight: "250px", margin: "40px" }}>
  <Link to={`/products/${product.id}`}>
    <img
      src={product.image}
      className="img card-top-image"
      alt="..."
      style={{  maxWidth: "200px", maxHeight: "250px" }}
    />
  </Link>
</div>

              <div className="wishlist">
              { loginStatus ? (
              <FontAwesomeIcon
                  icon={faHeart}
                  className={`wishlist-icon ${wishlist[product.id] ? "wishlist-added" : ""}`}
                  onClick={() => handleWishlistClick(product.id)}
                  style={{ color: wishlist[product.id] ? "pink" : "grey" }}
                />):null}


              </div>
              <hr />
              <div className="card-body">
                <h5 className="card-title">
                  {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
                </h5>
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < product.rating.rate ? "filled-star" : "empty-star"}
                    />
                  ))}
                  {product.rating.rate}
                  <span>({product.rating.count})</span>
                </div>
                <h2>
                  <span>&#36;</span>
                  {product.price}
                  <span style={{ fontSize: "22px", marginLeft: "10px", color: "#888" }}></span>
                </h2>
                {/* <Link
                  to={'/products/' + product.id}
                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  
                >
                  ProductDetails
                </Link>
                <p></p> */}
                <Link

                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  onClick={() => addToCartHandler(product)}
                ><i className="fas fa-shopping-cart"></i>
                  Add To Cart
                </Link>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </>

  );
};

export default ProductsFiltered;
