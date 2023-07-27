import HeaderCategory from "../components/HeaderCategory"
import Navbar from "../components/Navbar"

const Errorpage=()=>{
    return(
        <>
        <Navbar />
        <HeaderCategory />
        <div className="container">
            <div style={{backgroundColor:'#fff', borderRadius:'10px',marginTop:"100px",padding:"40px",}}>
                <h1>404</h1>
                <p>oops! something went wrong, please try again</p>
            </div>
        </div>
        </>
        
    )
}

export default Errorpage