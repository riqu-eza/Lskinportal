/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/product";

const CategoryListing = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]); 
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3003/api/listing/category/${categoryName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setProducts(data); // Display fetched data
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryName]);

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
    <div className="grid grid-cols-3 gap-4 p-5">
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
