import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <div className="bg-[#0A1828] text-[#BFA181] flex justify-between items-center p-4 pt-6">
      {/* Left Section with One Word */}
      <div className="">
        <Link to='/' className="pl-10 text-5xl font-bold "  >
        Lskin
        </Link>
        </div>
  
      {/* Right Section with Links */}
      <div className="flex gap-8">
        <Link to="/login" className=" text-lg hover:underline">
          shop
        </Link>
        <Link to="/search" className="text-lg hover:underline">
          search
        </Link>
        <Link to="/cart" className=" text-lg hover:underline">
          cart
        </Link>
        <Link
          to="/login"
          className=" text-lg hover:underline"
        >
          account
        </Link>
      </div>
    </div>
  </>
  
  );
};

export default Header;
