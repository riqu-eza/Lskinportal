import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import Header from "../../components/header";

const Checkout = () => {
  const { productId, userId, orderId } = useParams();
  const { currentUser } = useUser();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    address: '',
    phoneNumber: '',
    email: currentUser ? currentUser.email : '',
    orderItems: [],
    totalPrice: 0,
    discount: 0,
    shipping: 0,
    discountCode: '',
  });

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setFormData(prev => ({ ...prev, email: currentUser.email }));
    } else {
      setEmail(""); // Reset email if there's no current user
      setFormData(prev => ({ ...prev, email: '' }));
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (productId && userId) {
        const productResponse = await fetch(
          `http://localhost:3003/api/listing/products/${productId}`
        );
        const product = await productResponse.json();
        setOrderItems([{ ...product, quantity: 1 }]);
      } else if (orderId) {
        const orderResponse = await fetch(
          `http://localhost:3003/api/order/getorder/${orderId}`
        );
        const orderData = await orderResponse.json();
        setOrderItems(orderData.items);
        setTotalPrice(orderData.totalPrice);
      }
    };
    fetchData();
  }, [productId, userId, orderId]);

  const updateQuantity = (id, increment) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + increment } : item
      )
    );
  };

  useEffect(() => {
    const total = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    setFormData(prev => ({ ...prev, totalPrice: total }));
  }, [orderItems]);

  const handleDiscountApply = async () => {
    const response = await fetch(`/api/discounts/${discountCode}`);
    const discountData = await response.json();
    setDiscount(discountData.amount);
    setFormData(prev => ({ ...prev, discount: discountData.amount }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let submittedData;
  
    // Extract necessary details from orderItems
    const formattedOrderItems = orderItems.map(item => ({
      productId: item._id, // Assuming _id is the product ID
      quantity: item.quantity,
      price: item.price
    }));
  
    if (orderId) {
      // If orderId is present, send the orderId with totalPrice and other details
      submittedData = {
        ...formData,
        orderId, // Send orderId instead of orderItems
        totalPrice,
        shipping,
        discount,
      };
    } else if (productId) {
      // If productId is present, create a new order and send order ID in the checkout
      const orderResponse = await fetch('http://localhost:3003/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderItems: formattedOrderItems }), // Create order with orderItems
      });
  
      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        const newOrderId = orderData.id; // Assuming the order ID is returned
  
        // Now proceed to checkout with the order ID
        submittedData = {
          ...formData,
          orderId: newOrderId, // Send the newly created order ID
          totalPrice,
          shipping,
          discount,
        };
      } else {
        console.error('Error creating order:', orderResponse.statusText);
        return; // Exit if there's an error creating the order
      }
    }
  
    // Send the data to the checkout API
    const response = await fetch('http://localhost:3003/api/order/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submittedData),
    });
    console.log('checkout', submittedData);
  
    if (response.ok) {
      const responseData = await response.json();
      console.log('Order submitted successfully:', responseData);
      
      // Reset input fields and state variables
      setFormData({}); // Reset formData (adjust based on your initial state structure)
      setOrderItems([]); // Reset orderItems
      setTotalPrice(0); // Reset totalPrice
      setShipping(0); // Reset shipping
      setDiscount(0); // Reset discount
      // Optionally redirect to a confirmation page or show a success message
    } else {
      console.error('Error submitting order:', response.statusText);
      // Handle error (e.g., show an error message)
    }
  };
  
  

  return (
    <>
    <Header/>
    <div className="max-w-6xl mx-auto p-8 bg-white border border-gray-200 rounded shadow-md">
      <form onSubmit={handleSubmit} className="flex">
        {/* Left Section: Delivery Details */}
        <div className="flex-1 pr-4">
          {/* Account Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Account</h3>
            {currentUser ? (
              <p>Logged in as: {currentUser.email}</p>
            ) : (
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormData(prev => ({ ...prev, email: e.target.value }));
                }}
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
            )}
          </div>
          {/* Delivery Address Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
            <input type="text" placeholder="First Name" required 
              value={formData.firstName} 
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Last Name" required 
              value={formData.lastName} 
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Country" required 
              value={formData.country} 
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="City" required 
              value={formData.city} 
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Address" required 
              value={formData.address} 
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Phone Number" required 
              value={formData.phoneNumber} 
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded mb-2" />
          </div>
          {/* Shipping Method Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Method</h3>
            <select 
              onChange={(e) => {
                const shippingValue = e.target.value;
                setShipping(shippingValue);
                setFormData(prev => ({ ...prev, shipping: shippingValue }));
              }} 
              className="w-full p-3 border border-gray-300 rounded">
              <option value="10">Standard - $10</option>
              <option value="20">Express - $20</option>
            </select>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="flex-1 pl-4">
          <h3 className="text-lg font-semibold mb-4">Your Order</h3>
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4 mb-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-700">${item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <input
            type="text"
            value={discountCode}
            onChange={(e) => {
              setDiscountCode(e.target.value);
              setFormData(prev => ({ ...prev, discountCode: e.target.value }));
            }}
            placeholder="Discount Code"
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          <button
            type="button"
            onClick={handleDiscountApply}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Apply Discount
          </button>
          <div className="mb-4">
            <p>Total: ${totalPrice}</p>
            <p>Discount: ${discount}</p>
            <p>Shipping: ${shipping}</p>
            <p className="font-bold">
              Grand Total: ${totalPrice - discount + Number(shipping)}
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Checkout;
