import { Link } from "react-router-dom";

const Adminpage = ()=>{
return(
    <>
    <div>
        <Link to='/createlisting' >add product</Link>
    </div>
    <div>
        <Link to='/addblog' > add blog </Link>
    </div>
    </>
)
}
 

export default Adminpage;