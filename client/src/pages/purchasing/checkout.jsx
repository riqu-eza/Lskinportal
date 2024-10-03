import { useParams } from "react-router-dom";
import { useEffect, useState, } from "react";
import { useUser } from "../../context/UserContext";

const Checkout = () => {
  const { productId, userId, orderId } = useParams();
  const { currentUser } = useUser();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
console.log('current user ', currentUser)
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      setEmail(""); // Reset email if there's no current user
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
  }, [orderItems]);

  const handleDiscountApply = async () => {
    const response = await fetch(`/api/discounts/${discountCode}`);
    const discountData = await response.json();
    setDiscount(discountData.amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      orderItems,
      totalPrice,
      discount,
      shipping,
      discountCode,
    };

    // Here you can send the formData to your API
    console.log("Form Data: ", formData);
  };

  return (
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
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded"
              />
            )}
          </div>
          {/* Delivery Address Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
            <input type="text" placeholder="First Name" required className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Last Name" required className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Country" required className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="City" required className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Address" required className="w-full p-3 border border-gray-300 rounded mb-2" />
            <input type="text" placeholder="Phone Number" required className="w-full p-3 border border-gray-300 rounded mb-2" />
          </div>
          {/* Shipping Method Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Method</h3>
            <select onChange={(e) => setShipping(e.target.value)} className="w-full p-3 border border-gray-300 rounded">
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
            onChange={(e) => setDiscountCode(e.target.value)}
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

          <h4 className="font-semibold">Subtotal: ${totalPrice.toFixed(2)}</h4>
          <h4 className="font-semibold">Discount: -${discount.toFixed(2)}</h4>
          <h4 className="font-semibold">Shipping: ${shipping}</h4>
          <h4 className="font-bold text-lg">
            Total: ${(totalPrice - discount + parseInt(shipping)).toFixed(2)}
          </h4>
          <button type="submit" className="bg-blue-600 text-white w-full py-3 rounded mt-4 hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
