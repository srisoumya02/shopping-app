import HeaderCategory from "../components/HeaderCategory";
import Navbar from "../components/Navbar";
import ProductCategoryList from "../components/ProductCategoryList";


const HomePage=(wishlist)=>{
    const wishlistedItemsCount = Object.keys(wishlist).length;


    return(
        <>
        <Navbar wishlist={wishlist} />
        <HeaderCategory />
        <ProductCategoryList />
        
 
        </>
    )
}
export default HomePage;