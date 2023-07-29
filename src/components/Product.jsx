
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/actions/cart-actions';
import { addToWishlist, removeFromWishlist } from '../Redux/actions/wishlist-actions';



const Product = (props) => {

  const { id, image, title, rating, price } = props.data;
  const [isIconClicked, setIconClicked] = useState(false);

  const handleWishlistClick = (productId, isWishlisted) => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
      setIconClicked(isIconClicked)
    } else {
      dispatch(addToWishlist(productId));
      setIconClicked(!isIconClicked)
    }
  };
  const dispatch = useDispatch()
  const addToCartHandler = () => {
    dispatch(addToCart(id))
  }

  return (
    <div className="col-sm-4" >
      <ul className="card" style={{ padding: "0px", width: "285px", height: "450px" }}>
        <img src={image} className="img" alt="..." style={{ maxWidth: "200px", maxHeight: "200px", marginTop: "20px" }} />

        <div className="wishlist">
          <FontAwesomeIcon
            icon={faHeart}
            className={`wishlist-icon ${isIconClicked ? "wishlist-added" : ""}`}
            onClick={() => handleWishlistClick(id)}
            style={{ color: isIconClicked ? "pink" : "grey" }} 
          />
        </div>
        <hr />
        <div className="card-body" >
          <h5 className="card-title">
            {title.length > 20 ? `${title.substring(0, 20)}...` : title}
          </h5>
          <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < rating.rate ? "filled-star" : "empty-star"}
              />
            ))}
            {rating.rate}
            <span>({rating.count})</span>
          </div>
          <h2>
            <span>&#36;</span>
            {price}
            <span style={{ fontSize: "22px", marginLeft: "10px", color: "#888" }}></span>
          </h2>

          <Link
            to={'/products/' + id}
            className="btn btn-primary"
            style={{ width: "250px", height: "40px" }}
            onClick={addToCartHandler}
          >
            <i className="fas fa-shopping-cart"></i>
            Add To Cart
          </Link>
        </div>
      </ul>
    </div>
  )
}

export default Product;