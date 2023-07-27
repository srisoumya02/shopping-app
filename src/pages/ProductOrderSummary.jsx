import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Endpoints from "../apis/Endpoints";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderCategory from "../components/HeaderCategory";


const ProductOrderSummary = () => {
    const { id } = useParams();
  

    const [product, setProduct] = useState({})


    const getData = () => {
        axios.get(Endpoints.PRODUCTS_URL + id)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch(error => console.log(error))
    };
    
    return (
        <>
            <Navbar />
            <HeaderCategory />
            <div className="rowordersummary" style={{ border: "solid lightgrey" }}>
                <img src={product.image} alt="" className="img-fluid" style={{ marginTop: "50px", height: "200px", maxWidth:"200px" }} />
                <div className="col-sm-7" style={{ borderRight: "solid lightgrey" }}>

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
                    <h5 style={{ fontsize: '22px', marginleft: '10px', color: 'grey' }}>{product.title}</h5>

                    <h2 style={{ fontsize: '22px', marginleft: '10px', color: 'grey' }}>
                        <span>&#36;</span>
                        <span >
                        {product.price}
                        </span>
                    </h2>
                </div>
                <div className="col-sm-3" >
                    <h5>Order Summary</h5>
                    <table style={{ marginTop: "20px" }}>
                        <thead>

                            <tr>
                                <td>SubTotal</td>
                                <td><span>&#36;</span>{product.price}</td>
                            </tr>
                            <tr>
                                <td>ShoppingEstimate</td>
                                <td><span>&#36;</span>5</td>
                            </tr>
                            <tr>
                                <td>TaxEstimate</td>
                                <td><span>&#36;</span>5</td>
                            </tr>
                            <tr>
                                <td><h6 >Order Total</h6></td>
                                <td><h6><span>&#36;</span>{product.price + 5 + 5}</h6></td>
                            </tr>
                        </thead>

                    </table>



                </div>

            </div>



        </>
    )
}

export default ProductOrderSummary