import { Link } from "react-router-dom";
import Homecontainer from "../components/Homcontainers";
import { useEffect, useState } from "react";
import CategoryRow from "../components/category";

const Home = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3003/api/listing/gellisting"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      // Group products by category
      const grouped = data.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = []; // Initialize category if it doesn't exist
        }
        acc[category].push(product); // Push the product into its category array
        return acc;
      }, {});

      setGroupedProducts(grouped);
      console.log(grouped);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);
  return (
    <>
      <div
        className="relative "
        style={{
          backgroundImage: `url('/wallhaven1.jpg')`, // Path to your image
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          height: "75vh", // 3/4 of the screen height
          width: "100%", // Full width of the screen
          filter: "brightness(90%)", // Optional: adjust brightness for aesthetics
        }}
      >
        {/* Top Section */}
        <div className="flex justify-between items-center p-4 pt-6">
          {/* Left Section with One Word */}
          <div>
            <Link to="/" className=" text-5xl font-bold">Lskin</Link>{" "}
          </div>

          {/* Right Section with Links */}
          <div className="flex gap-8">
            <Link to="/login" className="text-white text-lg hover:underline">
              shop
            </Link>
            <Link to="/search" className="text-white text-lg hover:underline">
              search
            </Link>
            <Link to="/cart" className="text-white text-lg hover:underline">
              cart
            </Link>
            <Link
              to="/login"
              className="text-white text-lg hover:underline"
            >
              account
            </Link>
          </div>
        </div>

        {/* Middle Right Section with Wordings */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <div className="text-white text-3xl font-bold mb-2 text-right">
            Embrace Your Natural Beauty
          </div>
          <p className="text-white text-lg text-right">
            Explore a wide range of luxury cosmetics, carefully crafted to
            enhance your skin and bring out the best version of you.
          </p>
        </div>
      </div>
      <div
        className="absolute  -10 left-1/2 transform -translate-x-1/2"
        style={{
          top: "8cm",
          zIndex: 10,
        }}
      >
        <div className="flex">
          <Homecontainer
            imageUrl="/wallhaven.png" // Replace with your actual image URL
            title="New Arrival"
            description="Discover the latest in arrivala."
            navigateTo="/new-arrival"
          />
          <Homecontainer
            imageUrl="/wallhaven.png" // Replace with your actual image URL
            title="Popular Choises"
            description="Discover the latest in skincare."
            navigateTo="/PopularChoises"
          />
        </div>
      </div>
      <div className="mt-96">
        {Object.keys(groupedProducts).map((categoryName) => (
          <CategoryRow
            key={categoryName}
            categoryName={categoryName}
            products={groupedProducts[categoryName]}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
