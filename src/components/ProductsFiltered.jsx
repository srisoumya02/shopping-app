
import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import Endpoints from "../apis/Endpoints";
import Navbar from "./Navbar";
import HeaderCategory from "./HeaderCategory";
import { useDispatch } from "react-redux";
import {addToCart} from '../Redux/actions/cart-actions';
import { addToWishlist, removeFromWishlist } from '../Redux/actions/wishlist-actions';


const ProductsFiltered = () => {
  const [wishlist, setWishlist] = useState({});
  const { category,id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products for the selected category from the API
    axios
      .get(Endpoints.CATEGORY_URL + category)
      .then((response) => {
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [category,id]);

  const handleWishlistClick = (productId, isWishlisted) => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const dispatch=useDispatch()
  const addToCartHandler=()=>{
    dispatch(addToCart(filteredProducts))
}


  return (
    <>
    <Navbar />
    <HeaderCategory />
    <div className="row" style={{margin:"40px"}}>
      {filteredProducts.map((product) => (
        <div className="col-sm-4" key={product.id} >
          <ul className="card" style={{padding:"0px",width:"285px",height:"450px"}}>
            <img src={product.image} className="img card-top-image" alt="..." style={{ maxWidth: "200px", maxHeight: "200px", marginTop:"20px" }} />

            <div className="wishlist">
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => handleWishlistClick(product.id)}
                style={{ color: wishlist[product.id] ? "pink" : "" }}
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
              to={'/products/'+product.id} 
              className="btn btn-primary"
              style={{width:"250px",height:"40px"}}
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
