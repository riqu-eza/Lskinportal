import Homecontainer from "../components/Homcontainers";
import { useEffect, useState } from "react";
import CategoryRow from "../components/category";
import { useUser } from "../context/UserContext";
import Header from "../components/header";
import "./home.css"

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [groupedProducts, setGroupedProducts] = useState({});
  const { currentUser } = useUser();

  const images = [
    "/wallhaven1.jpg",
    "/wallhaven.png",
    "/homelskin1.jpg",
    "/homelskin2.jpg",
    "/homelskin3.jpg",
  ];

  useEffect(() => {
    // Change image every 5 seconds (5000 ms)
    const interval = setInterval(() => {
      // Update the image index in a cyclic manner
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

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
      <Header />
      <div
        className="relative "
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`, // Path to your image
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          height: "75vh", // 3/4 of the screen height
          width: "100%", // Full width of the screen
          filter: "brightness(90%)", // Optional: adjust brightness for aesthetics
        }}
      >
        {/* Top Section */}

        {/* Middle Right Section with Wordings */}
        <div className="flex flex-col justify-center items-center h-80 gap-8 text-center">
          <p className="text-5xl regtext animate-slide-in-left">
            beauty, cosmetic & personal care
          </p>
          <h1 style={{color:'#a67e5a'   }} className=" maintext text-7xl font-bold animate-slide-in-right">
            BEAUTY IS IN THE SKIN
          </h1>
        </div>
      </div>
      <div
        className="absolute  -10 left-1/2 transform -translate-x-1/2"
        style={{
          top: "11cm",
          zIndex: 10,
        }}
      >
        <div className="flex">
          <Homecontainer
            imageUrl="/123.avif" // Replace with your actual image URL
            title="New Arrival"
            description="Discover the latest in arrivala."
            navigateTo="/new-arrival"
          />
          <Homecontainer
            imageUrl="/homelskin2.jpg" // Replace with your actual image URL
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
            userId={currentUser ? currentUser._id : null}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
