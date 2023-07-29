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
  // const [wishlist, setWishlist] = useState({});
  const [isIconClicked, setIconClicked] = useState(false);
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [productWishlistStatus, setProductWishlistStatus] = useState({});

  useEffect(() => {
    if (category === undefined || category === "All") {
      // Fetch all products when no category is selected
      axios
        .get(Endpoints.PRODUCTS_URL)
        .then((response) => {
          const products = response.data;
          setFilteredProducts(products);

          // Initialize wishlist status for each product based on the global wishlist state
          const initialWishlistStatus = products.reduce((acc, product) => {
            acc[product.id] = wishlist.includes(product.id);
            return acc;
          }, {});

          setProductWishlistStatus(initialWishlistStatus);
        })
        .catch((error) => console.log(error));
    } else {
      // Fetch products for the selected category from the API
      axios
        .get(Endpoints.CATEGORY_URL + category)
        .then((response) => {
          const products = response.data;
          setFilteredProducts(products);

          // Initialize wishlist status for each product based on the global wishlist state
          const initialWishlistStatus = products.reduce((acc, product) => {
            acc[product.id] = wishlist.includes(product.id);
            return acc;
          }, {});

          setProductWishlistStatus(initialWishlistStatus);
        })
        .catch((error) => console.log(error));
    }
  }, [category, wishlist, filteredProducts]);

  const handleWishlistClick = (productId) => {
    setProductWishlistStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: !prevStatus[productId],
    }));

    if (productWishlistStatus[productId]) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };


  const addToCartHandler = () => {
    dispatch(addToCart(filteredProducts.id))
  }


  return (
    <>
      <Navbar />
      <HeaderCategory />

      <div className="row" style={{ margin: "40px" }}>
        {filteredProducts.map((product) => (
          <div className="col-sm-3" key={product.id} >
            <ul className="card" style={{ padding: "0px", width: "300px", height: "500px", gap: "10px" }}>
              <img src={product.image} className="img card-top-image" alt="..." style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }} />

              <div className="wishlist">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`wishlist-icon ${productWishlistStatus[product.id] ? "wishlist-added" : ""}`}
                  onClick={() => handleWishlistClick(product.id)}
                  style={{ color: productWishlistStatus[product.id] ? "pink" : "grey" }}
                />

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
                <Link
                  to={'/products/' + product.id}
                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  onClick={addToCartHandler}
                >
                  ProductDetails
                </Link>
                <p></p>
                <Link

                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  onClick={addToCartHandler}
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
