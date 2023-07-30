import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderCategory from "../components/HeaderCategory";
import { selectCartItems, selectProductData } from "../Redux/selectors/cartSelectors";
import { fetchProductDataForCartItems } from "../Redux/actions/cart-actions";

const OrderSummary = () => {
  const { id } = useParams();
  console.log(id)
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems)
  const productsWithData = useSelector(selectProductData);
  console.log(productsWithData)
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Fetch the product data using the 'id' parameter
    axios.get(Endpoints.PRODUCTS_URL+id)
      .then(response => {
        console.log(response.data)
        setProduct(response.data);
        fetchProductDataForCartItems(cartItems);
      })
      
      .catch(error => {
        console.error("Error fetching product:", error);
      });
      
  }, [cartItems,id]);


 
  // Calculate the total price of all products in the cart
  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => total + item.price, 0) ?? 0;
  };
  // Calculate the tax estimate (e.g., 5% of the total price)
  const calculateTaxEstimate = () => {
    return calculateTotalPrice() * 0.05;
  };

  // Calculate the shipping estimate (e.g., $5 flat rate)
  const calculateShippingEstimate = () => {
    return 5;
  };

  return (
    <>
      <Navbar />
      <HeaderCategory />
      <div className="row ordersummary" style={{ border: "solid lightgrey" }}>
        <img
          src={productsWithData.image}
          alt=""
          className="img-fluid"
          style={{ height: "200px", maxWidth: "200px" }}
        />
        <div className="col-sm-8">
          <h3>Brand</h3>
          <FontAwesomeIcon
            icon={faTrash}
            // onClick={() => handleDelete(product.id)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          />
          <h5 style={{ fontSize: "22px", marginLeft: "10px", color: "grey" }}>
            {productsWithData.title}
          </h5>
        </div>

        <div className="col-sm-3">
          <h5>Order Summary</h5>
          <table style={{ marginTop: "20px" }}>
            <tbody>
              <tr>
                <td>SubTotal</td>
                <td>
                  <span>&#36;</span>
                  {calculateTotalPrice()}
                </td>
              </tr>

              <tr>
                <td>Shipping Estimate</td>
                <td>
                  <span>&#36;</span>
                  {calculateShippingEstimate()}
                </td>
              </tr>
              <tr>
                <td>Tax Estimate</td>
                <td>
                  <span>&#36;</span>
                  {calculateTaxEstimate()}
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Order Total</h6>
                </td>
                <td>
                  <h6>
                    <span>&#36;</span>
                    {calculateTotalPrice() + calculateShippingEstimate() + calculateTaxEstimate()}
                  </h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
