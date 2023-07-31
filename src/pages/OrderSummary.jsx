import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderCategory from "../components/HeaderCategory";
import { selectCartItems, selectProductData } from "../Redux/selectors/cartSelectors";
import { fetchProductDataForCartItems,removeFromCart } from "../Redux/actions/cart-actions";


const OrderSummary = () => {
  const { id } = useParams();
  const cartItems = useSelector(selectCartItems);

  const productsWithData = useSelector(selectProductData);

  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Fetch the product data using the 'id' parameter
    axios.get(Endpoints.PRODUCTS_URL + id)
      .then(response => {
        console.log(response.data)
        setProduct(response.data);
      })

      .catch(error => {
        console.error("Error fetching product:", error);
      });
    dispatch(fetchProductDataForCartItems(cartItems));
  }, [cartItems, id]);
  console.log(productsWithData)

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));
  };
  // Calculate the total price of all products in the cart
  const calculateTotalPrice = () => {
    const totalprice= cartItems?.reduce((total, item) => total + item.price, 0) ?? 0;
    return parseFloat(totalprice.toFixed(2))
  };
  // Calculate the tax estimate (e.g., 5% of the total price)
  const calculateTaxEstimate = () => {
    return parseFloat((calculateTotalPrice() * 0.05).toFixed(2));
  };

  // Calculate the shipping estimate (e.g., $5 flat rate)
  const calculateShippingEstimate = () => {
    return 5;
  };

  


  return (
    <>
      <Navbar />
      <HeaderCategory />
      <div className="row ordersummary" style={{margin: "40px",border: "solid lightgrey",display:"flex" }}>
       <div className="col-sm-8">
        {productsWithData.map(item => (
          <div key={item.id} className="row" >
<ul className="card" style={{ display: "flex" ,flexDirection:"row",height:"300px",width:"800px",margin:"20px"}}>
<div  style={{ margin: "40px", padding: "0" }}>
              <img
                src={item.image}
                alt=""
                className="img-fluid"
                style={{ height: "200px", maxWidth: "150px" }}
              />
            </div>
            <div>
              <h3 style={{ marginTop: "40px" }}>Brand</h3>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(item._id)}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "40px",
                  right: "10px",
                }}
              />
              <h5 style={{ fontSize: "22px", color: "grey" }}>
                {item.title}
              </h5>
              <h2 style={{ fontsize: "22px", marginleft: "10px", color: "grey" }}>
                <span>&#36;</span>
                {item.price}
              </h2>
            <input className="quantity-input" type="number" value={item.quantity} />
      
            </div>

</ul>
          </div>
          
        ))}
   </div>
      <div className="col-sm-3" style={{marginTop:"40px"}} >
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
