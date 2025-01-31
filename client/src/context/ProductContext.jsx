/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/listing/gellisting");
        if (!response.ok) throw new Error("Error fetching listings");
        const data = await response.json();

        // Group products by category
        const groupedByCategory = data.reduce((acc, product) => {
          const category = product.category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        // Store in cache (localStorage) for future use
        localStorage.setItem("groupedProducts", JSON.stringify(groupedByCategory));

        setGroupedProducts(groupedByCategory);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Load from cache if API fails
        const cachedData = localStorage.getItem("groupedProducts");
        if (cachedData) setGroupedProducts(JSON.parse(cachedData));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={{ groupedProducts, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook to access Product Context
export const useProducts = () => useContext(ProductContext);
