import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { productId, userId, orderId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  
  useEffect(() => {
    // Fetch product or order data depending on the route
    const fetchData = async () => {
      if (productId && userId) {
        // Fetch product details and add it to the order
        const productResponse = await fetch(`/api/product/${productId}`);
        const product = await productResponse.json();
        setOrderItems([{ ...product, quantity: 1 }]);
      } else if (orderId) {
        // Fetch order details by orderId
        const orderResponse = await fetch(`/api/order/${orderId}`);
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
    // Recalculate total price whenever items change
    const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [orderItems]);

  const handleDiscountApply = async () => {
    // Validate the discount code and calculate the discount amount
    const response = await fetch(`/api/discounts/${discountCode}`);
    const discountData = await response.json();
    setDiscount(discountData.amount);
  };

  return (
    <div className="checkout-container">
      {/* Left Section: Delivery Details */}
      <div className="checkout-left">
        {/* Account Section */}
        <div>
          {/* Check if signed in, else show email input */}
        </div>
        {/* Delivery Address Section */}
        <div>
          <h3>Delivery Address</h3>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Country" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Phone Number" />
        </div>
        {/* Shipping Method Section */}
        <div>
          <h3>Shipping Method</h3>
          <select onChange={(e) => setShipping(e.target.value)}>
            <option value="10">Standard - $10</option>
            <option value="20">Express - $20</option>
          </select>
        </div>
      </div>

      {/* Right Section: Order Summary */}
      <div className="checkout-right">
        <h3>Your Order</h3>
        {orderItems.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          </div>
        ))}
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Discount Code"
        />
        <button onClick={handleDiscountApply}>Apply Discount</button>

        <h4>Subtotal: ${totalPrice}</h4>
        <h4>Discount: -${discount}</h4>
        <h4>Shipping: ${shipping}</h4>
        <h4>Total: ${totalPrice - discount + parseInt(shipping)}</h4>
        <button onClick={() => console.log("Proceed to payment")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
