import Homecontainer from "../components/Homcontainers";
import { useEffect, useState } from "react";
import CategoryRow from "../components/category";
import { useUser } from "../context/UserContext";
import Header from "../components/header";
import "./home.css";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [groupedProducts, setGroupedProducts] = useState({});
  const { currentUser } = useUser();

  const images = [
    "/home1.jpeg",
    "/home.jpeg",
   
  ];

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
      const response = await fetch(
        "http://localhost:3003/api/listing/gellisting"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      const grouped = data.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});

      setGroupedProducts(grouped);
      console.log(grouped);
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
      <div
        className="relative"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "75vh",
          width: "100%",
          filter: "brightness(90%)",
        }}
      >
        {/* Middle Right Section with Wordings */}
        <div className="flex flex-col justify-center items-center h-full gap-8 text-center">
          <p className="text-5xl regtext animate-slide-in-left">
             Cosmetic & Personal care
          </p>
          <h1 style={{ color: "#a67e5a" }} className="regtext text-8xl font-bold animate-slide-in-right">
            BEAUTY IS IN THE SKIN
          </h1>
        </div>
      </div>

      {/* Homecontainer Section */}
      <div
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
      </div>

      {/* Category Section */}
      <div className="mt-10">
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
