/* eslint-disable react/prop-types */

import { useNavigate, } from "react-router-dom";
import Button from "../ux/button";

const Homecontainer = ({ imageUrl, title, description,navigateTo }) => {
const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(navigateTo); // Navigate to the specified route
  };
  return (
    <div
      className="relative w-[450px] h-[500px] bg-cover bg-center p-8"
      style={{
        backgroundImage: `url(${imageUrl})`, // Dynamically set background image
        zIndex: 20, // Ensure it is above other content
        margin: '20px', // Margin to separate containers
      }}
    >
      <div className="absolute bottom-0 left-20 right-0 p-4 bg-black bg-opacity-0 text-white" >
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
        <Button
          handleButtonClick={handleButtonClick} 
          buttonText="Learn More" 
        >
        </Button>
      </div>
      
    </div>
  );
};

export default Homecontainer;
