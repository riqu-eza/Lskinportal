import Homecontainer from "../components/Homcontainers";
import { useEffect, useState } from "react";
import CategoryRow from "../components/category";
import { useUser } from "../context/UserContext";
import Header from "../components/header";
import "./home.css";
import Packages from "../components/packages";
import BlogComponent from "../components/bloglisting";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [groupedProducts, setGroupedProducts] = useState({});
  const { currentUser } = useUser();

  const images = ["/home.jpeg"];
  const imageUrl = ["/rectangle3.png"];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch product data and group by category
  const fetchData = async () => {
    try {
      const response = await fetch("/api/listing/gellisting");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      // Grouping by category
      const groupedByCategory = data.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});

      // Top-rated products
      const topRatedProducts = [...data]
        .filter((product) => product.averageRating > 0) // Only include rated products
        .sort((a, b) => b.averageRating - a.averageRating); // Sort by averageRating descending

      // Most recent products
      const mostRecentProducts = [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort by createdAt descending

      // Combine all groupings
      const combinedGrouped = {
        ...groupedByCategory,
        TopRated: topRatedProducts,
        MostRecent: mostRecentProducts,
      };

      setGroupedProducts(combinedGrouped);

      console.log(combinedGrouped);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  return (
    <>
      <Header />
      {/* Carousel Section */}
      <div className="relative flex h-[290px]">
        {/* Left Section */}
        <div className="flex-1 relative z-10 p-4 flex flex-col justify-center bg-[#F5E0E5]">
          {/* Transparent wordings overlaying both containers */}
          <div
            className="absolute top-0 left-0 right-[-20] bottom-0 flex flex-col justify-center gap-4 p-8 text-white"
            style={{ pointerEvents: "none" }}
          >
            {/* Header */}
            <h2
              className="text-4xl font-bold"
              style={{
                color: "#383838",
                font: "poppins",
              }}
            >
              Experience the Difference
            </h2>

            {/* Paragraph */}
            <p
              className="text-lg leading-relaxed"
              style={{
                color: "#383838",
                font: "poppins",
              }}
            >
              Discover our unique offerings and enjoy unmatched experiences that
              redefine your expectations. Step into a world of excellence.
            </p>

            {/* Button */}
            <div style={{ pointerEvents: "auto" }}>
              <button className="bg-[#F5A3B7] hover:bg-[#252525] text-white font-semibold py-2 px-4 rounded transition-all">
                Shop now
              </button>
            </div>
          </div>
        </div>

        {/* Right Section with Background Image */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Optional dark overlay */}
        </div>
      </div>

      {/* Homecontainer Section */}
      {/* <div
        className="relative mx-auto justify-center flex flex-col md:flex-row gap-6"
        style={{
          marginTop: "-90px", // Lift it slightly to overlap the carousel
          zIndex: 10,
        }}
      >
        <Homecontainer
          imageUrl="/new.jpeg"
          title="New Arrival"
          description="Discover the latest in arrival."
          navigateTo="/new-arrival"
        />
        <Homecontainer
          imageUrl="/Popular.jpeg"
          title="Popular Choises"
          description="Discover the latest in skincare."
          navigateTo="/PopularChoises"
        />
      </div> */}
      {/* Category Section */}
      <div className="md:mx-40">
        {/* Pass only TopRated and MostRecent categories */}
        {Object.keys(groupedProducts).map((categoryName) => {
          if (categoryName === "TopRated" || categoryName === "MostRecent") {
            return (
              <CategoryRow
                key={categoryName}
                categoryName={categoryName}
                products={groupedProducts[categoryName]} // Pass the products for TopRated and MostRecent
                userId={currentUser ? currentUser._id : null}
              />
            );
          }
          return null; // Ensure other categories are not rendered
        })}
      </div>

      <div className="md:mx-40" >
        <Packages products={groupedProducts["Gift set packages"]} />
      </div>
      <div className="md:mx-40" >
        <BlogComponent/>
      </div>
    </>
  );
};

export default Home;
