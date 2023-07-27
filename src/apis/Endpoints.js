import Constants from "./Constants"

const Endpoints = {
    CATEGORIES_URL:`${Constants.BASE_URL}products/categories`,
    CATEGORY_URL:`${Constants.BASE_URL}products/category/`,
    PRODUCTS_URL:`${Constants.BASE_URL}products/`,
    PRODUCT_BYID_URL:`${Constants.BASE_URL}products/:id`,
    REGISTER_URL: `${Constants.BASE_URL}users`,
    LOGIN_URL: `${Constants.BASE_URL}auth/login`,
}

export default Endpoints