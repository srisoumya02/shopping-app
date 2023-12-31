import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Endpoints from "../apis/Endpoints";

const HeaderCategory = () => {
  // const {category}=useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(Endpoints.CATEGORIES_URL)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <div>
      <ul className="nav justify-content-center">
        <li>
          <Link to="/" className="list-group-item" style={{ border: "none", cursor: "pointer" }}>
            All
          </Link>
        </li>

        {categories.map((category, index) => (
          <li
            key={index}
            className="list-group-item"
            style={{ border: "none", cursor: "pointer" }}
          >
            <Link to={`/products/category/${category}`}>
            {capitalizeFirstLetter(category)}
            </Link>

          </li>
        ))}
        
    
      </ul>
     
    
    </div>
  );
};

export default HeaderCategory;
