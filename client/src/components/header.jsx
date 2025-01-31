/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiShoppingCart } from "react-icons/fi";
import "./components.css";
import { useProducts } from "../context/ProductContext";

const Header = () => {

  // eslint-disable-next-line no-unused-vars
  const { groupedProducts, loading } = useProducts(); // Get grouped products from context
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const menuToggleRef = useRef(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleCategorySelect = (category) => {
    setDropdownOpen(false);
    
    // Ensure groupedProducts is available before accessing it
    if (!groupedProducts || !groupedProducts[category]) {
      console.error(`Category "${category}" not found in groupedProducts.`);
      return;
    }

    navigate(`/category/${category}`, {
      state: { products: groupedProducts[category] || [] },
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <div className="bg-[#0A182E] text-white hidden md:flex justify-between items-center p-4">
        <div>
          <Link to="/" className="pl-10 text-2xl font-bold">
            <span className="text-[#F5A3B7]">Lskin</span>{" "}
            <span className="text-white">Essentials</span>
          </Link>
        </div>
        <div className="flex gap-8">
          <Link to="/About" className="text-lg hover:underline">About</Link>

          {/* Shop Dropdown */}
          <div className="relative dropdown-container">
            <button
              className="text-lg hover:underline"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Shop
            </button>
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-48 bg-white shadow-md rounded-md text-[#4B4B4B] border border-gray-300 z-10">
                {Object.keys(groupedProducts).map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:border-b-2 hover:border-[#F5A3B7] cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <Link to={`/category/${category}`} className="block">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Bar */}
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
                <button onClick={handleSearch} className="ml-2 p-2 text-gray-500 hover:text-gray-800">
                  <FiSearch size={20} />
                </button>
              </div>
            )}
          </div>

          <Link to="/cart" className="text-lg hover:underline">Cart</Link>
          <Link to="/login" className="text-lg hover:underline">Account</Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="bg-[#0A182E] text-white flex md:hidden justify-between items-center p-4 relative">
        <button ref={menuToggleRef} onClick={() => setMenuOpen(!isMenuOpen)} className="text-3xl z-10">
          <FiMenu />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold z-0">
          <Link to="/" className="flex items-center">
            <span className="text-[#F5A3B7]">Lskin</span>{" "}
            <span className="text-white">Essentials</span>
          </Link>
        </div>
        <Link to="/cart" className="relative text-2xl z-10">
          <FiShoppingCart />
        </Link>
      </div>

      {isMenuOpen && (
        <div ref={mobileMenuRef} className="absolute top-16 left-0 w-auto bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4 md:hidden">
          <Link to="/About" className="block py-2 text-gray-800 hover:underline">About</Link>
          <div className="relative">
            <button className="block py-2 text-gray-800 hover:underline" onClick={() => setDropdownOpen(!isDropdownOpen)}>
              Shop
            </button>
            {isDropdownOpen && (
              <ul className="bg-white shadow-md rounded-md mt-2">
                {Object.keys(groupedProducts).map((category) => (
                  <li key={category} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Link to={`/category/${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to="/cart" className="block py-2 text-gray-800 hover:underline">Cart</Link>
          <Link to="/login" className="block py-2 text-gray-800 hover:underline">Account</Link>
        </div>
      )}
    </>
  );
};

export default Header;
