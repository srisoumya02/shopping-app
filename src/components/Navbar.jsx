import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { selectWishlistItemsCount } from '../Redux/selectors/wishlistSelectors';
import { selectCartNumber } from '../Redux/selectors/cartSelectors';
import {resetCart} from '../Redux/actions/cart-actions';


const Navbar = () => {
    const wishlistItemsCount = useSelector(selectWishlistItemsCount);
    const numberCart = useSelector(selectCartNumber);
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            setLoginStatus(false);
        } else {
            setLoginStatus(true);
        }
    }, [loginStatus]);

    const onLogoutHandler = () => {
        localStorage.clear();
        setLoginStatus(false);
        dispatch(resetCart());
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <Link className="navbar-brand" to="/" style={{ color: 'black', marginLeft: '40px' }}>
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
                        <li className="nav-item">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-user"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <form className="form-inline my-2 my-lg-0" style={{ gap: '20px' }}>
                                    {loginStatus ? (
                                        <button className="dropdown-item user-icon btn btn-danger" onClick={onLogoutHandler}>Logout</button>
                                    ) : (
                                        <>
                                            <Link className="dropdown-item user-icon" to="/login">Login</Link>
                                            <Link className="dropdown-item user-icon" to="/signup">Sign Up</Link>
                                        </>
                                    )}
                                </form>
                            </div>
                        </li>
                        <li className="nav-item">
                        { loginStatus ? (
    <Link to="/wishlist">
      <FontAwesomeIcon icon={faHeart} style={{ marginTop: "12px", color: wishlistItemsCount > 0 ? "pink" : "grey" }} />
      {wishlistItemsCount > 0 && (
        <span className="wishlist-added">{wishlistItemsCount}</span>
      )}
    </Link>
  ) : null}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-shopping-cart"></i>
                                {numberCart > 0 ? (
                                    <span className="badge cart-lookup">
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

export default Navbar;
