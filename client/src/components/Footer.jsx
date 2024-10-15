import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiSmartphone,
  FiTwitter,
} from "react-icons/fi";
import {
  FaPaypal,
  FaStripe,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaMobileAlt,
  FaRegCopyright,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    console.log("sent", email);
    try {
      const response = await fetch(
        "http://localhost:3003/api/newsletter/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setMessage("Thank you for subscribing!");
      setEmail(""); // Clear the input
    } catch (error) {
      setMessage("There was an error subscribing. Please try again.");
    }
  };
  return (
    <footer className="bg-gray-800  text-white p-8">
      <div className=" m-1 ">
        <h2 className="  p-2 m-1 text-center text-3xl  ">LSkin</h2>
      </div>
      <div className="container items-start mx-auto flex flex-col m-1 gap-1 top-2 p-1 md:flex-row  justify-between">
        {/* Opening Days */}
        <div className="mb-6 md:mb-0 flex-1 p-2">
          <h3 className="text-lg text-center p-1    font-bold">Opening Days</h3>
          <ul className="pl-5  border-2 mt-2  ">
            <li className="grid grid-cols-2 gap-4">
              <span>Monday</span> <span>9 AM - 5 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Tuesday</span> <span>9 AM - 5 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Wednesday</span> <span>9 AM - 5 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Thursday</span> <span>9 AM - 5 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Friday</span> <span>9 AM - 5 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Saturday</span> <span>10 AM - 4 PM</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Sunday</span> <span>Closed</span>
            </li>
            <li className="grid grid-cols-2 gap-4">
              <span>Holidays</span> <span>Closed</span>
            </li>
          </ul>
        </div>

        {/* Company Policy */}
        <div className="mb-6 md:mb-0  flex-1 p-2">
          <h3 className="text-lg text-center   p-1 font-bold">
            Company Policy
          </h3>
          <p className="mt-2    ">
            Go Green by providing organic products that are clean and made of
            nature with skin nourishing ingridients.
          </p>
          <p className="mt-2  ">
            Go Green by providing organic products that are clean and made of
            nature with skin nourishing ingridients.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-6 md:mb-0  flex-1 p-2">
          <h3 className="text-lg text-center   p-1 font-bold"> Newsletter</h3>
          <form
            className="flex p-1 flex-col gap-6 mt-2"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="p-2 rounded-md mb-2 border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500" // Added focus styles
              required
            />

            <button
              type="submit"
              className="bg-[#a67e5a] hover:bg-gray-200 text-black text-2xl py-2 rounded-md"
            >
              Subscribe
            </button>
            {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
          </form>
        </div>

        {/* Contact Information */}
        <div className="mb-6 md:mb-0 flex-1 p-2">
          <h3 className="text-lg    text-center p-1  font-bold">Contact Us</h3>
          <div className="mt-2 flex flex-col gap-4  p-4">
            <p className="flex items-center">
              <FiMapPin className="mr-2 text-[#a67e5a]" /> 1234 Kangundo Rd,NR
            </p>
            <p className="flex items-center">
              <FiSmartphone className="mr-2 text-[#a67e5a]" /> Phone: +254
              745168783
            </p>
            <p className="flex items-center">
              <FiMail className="mr-2 text-[#a67e5a]" />
              <a
                href="mailto:info@Lskinessentials.com"
                className="text-[#a67e5a]"
              >
                Email: info@Lskinessentials.com
              </a>
            </p>
          </div>{" "}
          <div className="flex justify-center mt-6">
            <Link to="#" className="mx-2">
              <FiFacebook className="h-6 w-6 text-blue-600" />
            </Link>
            <Link to="#" className="mx-2">
              <FiTwitter className="h-6 w-6 text-blue-400" />
            </Link>
            <Link to="#" className="mx-2">
              <FiInstagram className="h-6 w-6 text-pink-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center mt-6">
        <Link to="#" className="mx-2">
          <FaPaypal className="h-6 w-6 text-blue-500" />
        </Link>
        <Link to="#" className="mx-2">
          <FaStripe className="h-6 w-6 text-blue-700" />
        </Link>
        <Link to="#" className="mx-2">
          <FaCcVisa className="h-6 w-6 text-blue-600" />
        </Link>
        <Link to="#" className="mx-2">
          <FaCcMastercard className="h-6 w-6 text-red-600" />
        </Link>
        <Link to="#" className="mx-2">
          <FaCcAmex className="h-6 w-6 text-blue-500" />
        </Link>
        <Link to="#" className="mx-2">
          <FaMobileAlt className="h-6 w-6 text-green-500" />
        </Link>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-sm text-gray-500 flex items-center">
          <FaRegCopyright className="h-3 w-3 mr-1" />
          2024 Lskin. All rights reserved. | developed by Kang`ethe Muthunga.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
