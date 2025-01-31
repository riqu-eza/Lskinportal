/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/header";
import ProductCard from "../components/product";
import { useProducts } from "../context/ProductContext";

const CategoryListing = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const { groupedProducts, loading } = useProducts(); // Use global groupedProducts
  const [products, setProducts] = useState(location.state?.products || []);

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state on unmounted component

    const updateProducts = async () => {
      if (groupedProducts && groupedProducts[categoryName]) {
        setProducts([...groupedProducts[categoryName]]); // Create new array to trigger re-render
      } else {
        try {
          const response = await fetch(`/api/listing/getByCategory/${categoryName}`);
          if (!response.ok) throw new Error(`Error fetching category: ${response.status}`);
          const data = await response.json();
          if (isMounted) {
            setProducts(data);
          }
        } catch (error) {
          console.error("Error fetching category products:", error);
        }
      }
    };

    updateProducts();

    return () => {
      isMounted = false; // Cleanup function to avoid state updates on unmounted component
    };
  }, [categoryName, groupedProducts]); // Runs every time categoryName changes

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center mt-10">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-2 p-5 justify-items-center">
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <p className="text-center text-gray-500">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryListing;
