import React, { useState, useEffect } from "react";
import axios from "axios";
import Endpoints from "../apis/Endpoints"
import Product from "../components/Product";
import { useParams } from "react-router-dom";


const ProductCategoryList=()=>{
    const {category} =useParams()
    const [products, setProducts] = useState([]);

    const getData = () => {
        axios.get(Endpoints.PRODUCTS_URL)
        .then((response) => {
            console.log(response.data);
            setProducts(response.data);
        })
            .catch(error => console.log(error))
    };
    useEffect(() => {
        getData()
    }, [category])

    return (
        <div>
       
            <div className="row" style={{margin:"40px"}}>
              {
                products.map((product, index)=> <Product key={index} data={product}/>)
              }
            </div>
        </div>
    )
}

export default ProductCategoryList