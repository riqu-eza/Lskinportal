import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi"; // Added FiMenu for the hamburger icon
import "./components.css"; // Ensure this file contains any custom styles you might have

const Header = () => {
  const categoryOptions = [
    "body butter",
    "body oils",
    "Scented candles",
    "beard growth",
    "Hair growth",
    "Gift set packages",
  ];

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false); // State for the mobile menu
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false); // Close mobile menu if clicked outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-[#0A182] text-[#252525] flex justify-between items-center  md:p-4">
        {/* Left Section with One Word */}
        <div>
          <Link to="/" className="pl-10 text-2xl font-bold">
           <span className=" text-[#F5A3B7] " >Lskin</span>  <span className="text-1xl text-[#000000] " >Essentianls </span>
          </Link>
        </div>

        {/* Right Section for Desktop View */}
        <div className="hidden md:flex gap-8 ">
          <Link to="/About" className="text-lg hover:underline">
            About
          </Link>

          <div className="relative dropdown-container">
            <button
              className="text-lg hover:underline"
              onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
            >
              Shop
            </button>

            {isDropdownOpen && (
              <ul className="absolute mt-2 w-48 bg-white shadow-md rounded-md border border-gray-300 z-10">
                {categoryOptions.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <Link to={`/category/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative text-lg">
            {!isInputVisible ? (
              <span
                className="cursor-pointer hover:underline"
                onClick={() => setIsInputVisible(true)}
              >
                Search
              </span>
            ) : (
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none w-52"
                  placeholder="Search..."
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 p-2 text-gray-500 hover:text-gray-800"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            )}
          </div>
          <Link to="/cart" className="text-lg hover:underline">
            Cart
          </Link>
          <Link to="/login" className="text-lg hover:underline">
            Account
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setMenuOpen((prev) => !prev); // Toggle mobile menu
            }}
            className="text-3xl"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="bg-white shadow-md rounded-md border border-gray-900 z-70 p-4 md:hidden menu-container">
          <Link to="/About" className="block py-2 hover:underline">
            About
          </Link>
          <div className="relative">
            <button
              className="block py-2 hover:underline"
              onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown in mobile menu
            >
              Shop
            </button>
            {isDropdownOpen && (
              <ul className="bg-white shadow-md rounded-md border border-gray-300 mt-2">
                {categoryOptions.map((category) => (
                  <li key={category} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to={`/category/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            {!isInputVisible ? (
              <span
                className="block py-2 cursor-pointer hover:underline"
                onClick={() => setIsInputVisible(true)}
              >
                Search
              </span>
            ) : (
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none p-2 w-40"
                  placeholder="Search..."
                />
                <button
                  onClick={handleSearch}
                  className="ml-2 p-2 text-gray-500 hover:text-gray-800"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            )}
          </div>
          <Link to="/cart" className="block py-2 hover:underline">
            Cart
          </Link>
          <Link to="/login" className="block py-2 hover:underline">
            Account
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
