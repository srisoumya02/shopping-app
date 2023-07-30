import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../Redux/actions/wishlist-actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import { addToCart } from '../Redux/actions/cart-actions';
import Endpoints from '../apis/Endpoints';
import Navbar from '../components/Navbar';
import HeaderCategory from '../components/HeaderCategory';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});

  const handleWishlistClick = (productId) => {
    if (wishlist[productId]) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };
  useEffect(() => {
    // Fetch product details for all product IDs in the wishlist
    const productIds = Object.keys(wishlist);

    if (productIds.length > 0) {
      Promise.all(productIds.map(productId => axios.get(Endpoints.PRODUCTS_URL+productId)))
        .then((responses) => {
          const fetchedProducts = responses.reduce((acc, response) => {
            const product = response.data;
            acc[product.id] = product;
            return acc;
          }, {});
          setProducts(fetchedProducts);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [wishlist]);
  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };


  return (
    <div>
      <Navbar />
      <HeaderCategory />            
      <div className="row" style={{ margin: "40px" }}>
        {Object.keys(wishlist).map((productId) => (
          <div className="col-sm-3" key={productId} >
            <ul className="card" style={{ padding: "0px", width: "300px", height: "500px", gap: "10px" }}>
              {/* Display product information */}
              {products[productId] ? (
                <>
                  <img src={products[productId].image} className="img card-top-image" alt="..." style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }} />
                  <div className="wishlist">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`wishlist-icon ${wishlist[productId] ? "wishlist-added" : ""}`}
                  onClick={() => handleWishlistClick(productId)}
                  style={{ color: wishlist[productId] ? "pink" : "grey" }}
                />
              </div>
              <hr/>
                  <h5 className="card-title">
                    {products[productId].title.length > 20 ? `${products[productId].title.substring(0, 20)}...` : products[productId].title}
                  </h5>
                  <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={i < products[productId].rating.rate ? "filled-star" : "empty-star"}
                    />
                  ))}
                  {products[productId].rating.rate}
                  <span>({products[productId].rating.count})</span>
                </div>
                <h2>
                  <span>&#36;</span>
                  {products[productId].price}
                  <span style={{ fontSize: "22px", marginLeft: "10px", color: "#888" }}></span>
                </h2>
                <Link
                  to={'/products/' + productId}
                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  
                >
                  ProductDetails
                </Link>
                <p></p>
                <Link

                  className="btn btn-primary"
                  style={{ width: "250px", height: "40px" }}
                  onClick={() => addToCartHandler(productId)}
                ><i className="fas fa-shopping-cart"></i>
                  Add To Cart
                </Link>
                </>
              ) : (
                // Render a placeholder or loading state if product information is not available yet
                <div>Loading...</div>
              )}
            
              
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
