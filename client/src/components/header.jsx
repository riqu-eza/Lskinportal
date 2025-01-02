import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiShoppingCart } from "react-icons/fi";
import "./components.css";

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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const mobileMenuRef = useRef(null); // Ref for the mobile menu

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleCategorySelect = (category) => {
    setDropdownOpen(false);
    navigate(`/category/${category}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Default (Desktop) View */}
      <div className="bg-[#0A182E] text-white hidden md:flex justify-between items-center p-4">
        {/* Left Section */}
        <div>
          <Link to="/" className="pl-10 text-2xl font-bold">
            <span className="text-[#F5A3B7]">Lskin</span>{" "}
            <span className="text-white">Essentials</span>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="flex gap-8">
          <Link to="/About" className="text-lg hover:underline">
            About
          </Link>

          {/* Dropdown Shop */}
          <div className="relative dropdown-container">
            <button
              className="text-lg hover:underline"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Shop
            </button>
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-48 bg- shadow-md rounded-md text-[#4B4B4B] border border-gray-300 z-10">
                {categoryOptions.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2  hover:border-b-2 hover:border-[#F5A3B7] text-[#] cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <Link to={`/category/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search */}
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
      </div>

      {/* Mobile View */}
      <div className="bg-[#0A182E] text-white flex md:hidden justify-between items-center p-4">
        {/* Menu Icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-3xl"
        >
          <FiMenu />
        </button>

        {/* Title (Centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          <Link to="/" className="flex items-center">
            <span className="text-[#F5A3B7]">Lskin</span>{" "}
            <span className="text-white">Essentials</span>
          </Link>
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative text-3xl">
          <FiShoppingCart />
          {/* Cart Badge */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs rounded-full px-1">
            {}
          </span>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4 md:hidden"
        >
          <Link
            to="/About"
            className="block py-2 text-gray-800 hover:underline"
          >
            About
          </Link>
          <div className="relative">
            <button
              className="block py-2 text-gray-800 hover:underline"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              Shop
            </button>
            {isDropdownOpen && (
              <ul className="bg-white shadow-md rounded-md mt-2">
                {categoryOptions.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/cart" className="block py-2 text-gray-800 hover:underline">
            Cart
          </Link>
          <Link
            to="/login"
            className="block py-2 text-gray-800 hover:underline"
          >
            Account
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
