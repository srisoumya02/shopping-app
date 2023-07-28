import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import "../index.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItemsCount } from '../Redux/selectors/wishlistSelectors';
import { selectCartNumber, selectCartItems } from '../Redux/selectors/cartSelectors';
import { fetchProductDataForCartItems } from '../Redux/actions/cart-actions';
const Navbar = () => {
    const wishlistItemsCount = useSelector(selectWishlistItemsCount);
    const numberCart = useSelector(selectCartNumber);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductDataForCartItems(cartItems));
    }, [cartItems, dispatch]);

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <Link className="navbar-brand" to="/" style={{ color: 'black', marginleft: '40px' }}>
                    <span style={{ color: '#06b1f0' }}>SHOP</span>LANE
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown" >
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user"></i> Login/SignUp
                            </a>
                            <div className="dropdown-menu user-dropdown">
                                <Link className="dropdown-item user-icon" to="/login">Login</Link>
                                <Link className="dropdown-item user-icon" to="/signup">Sign Up</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/wishlist">
                                <FontAwesomeIcon icon={faHeart} style={{ marginTop: "12px", color: wishlistItemsCount > 0 ? "pink" : "grey" }}

                                />
                                {wishlistItemsCount > 0 && (
                                    <span className="wishlist-added">{wishlistItemsCount}</span>
                                )}
                            </Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/:id">
                                <i className="fas fa-shopping-cart"></i>
                                {numberCart > 0 ? (
                                    <span className="badge  cart-lookup">
                                        {numberCart}
                                    </span>
                                ) : null}
                            </Link>

                        </li>
                    </ul>

                </div>
            </nav>


        </>
    );
}

export default Navbar