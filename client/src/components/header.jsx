import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // Search icon from react-icons

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
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false); // Close the dropdown after selecting a category
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-[#0A1828] text-[#BFA181] flex justify-between items-center p-4 pt-6">
        {/* Left Section with One Word */}
        <div className="">
          <Link to="/" className="pl-10 text-5xl font-bold ">
            Lskin
          </Link>
        </div>

        {/* Right Section with Links */}
        <div className="flex gap-8">
          <div>
          <Link to="/About" className="text-lg hover:underline ">
            About 
          </Link>
          </div>
          <div className="relative dropdown-container">
            {/* Shop link */}
            <button
              className="text-lg hover:underline"
              onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
            >
              shop
            </button>

            {/* Dropdown with category options */}
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-48 bg-white shadow-md rounded-md border border-gray-300 z-10">
                {categoryOptions.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)} // Handle category click
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
                search
              </span>
            ) : (
              <div className="flex items-center border border-gray-300 rounded-md p-2 bg-white shadow-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none p-2 w-60"
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
          <Link to="/cart" className=" text-lg hover:underline">
            cart
          </Link>
          <Link to="/login" className=" text-lg hover:underline">
            account
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
