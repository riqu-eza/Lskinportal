/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/product";

const CategoryListing = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const { products } = location.state || {};
  console.log(location)
  // const [products, setProducts] = useState([]); 
 

  

  return <div>
    <>
    <div>
      <Header/>
    </div>
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">
        {categoryName} 
      </h1>
    </div>
    <div className="grid grid-cols-4 gap-4 ml-2 p-5">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </>
  </div>;
};

export default CategoryListing;
