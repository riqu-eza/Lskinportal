import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const { productId, userId } = useParams();
  const navigate = useNavigate();  // Getting productId and userId from URL
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch product details and add it to order when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:3003/api/product/${productId}`);
      const product = await response.json();
      addProductToOrder(product);
    };

    if (productId) {
      fetchProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Add product to order items
  const addProductToOrder = (product) => {
    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1, // Initialize quantity to 1
    };

    // If product is already in the cart, just increase quantity
    const existingItem = orderItems.find(item => item.id === product._id);
    if (existingItem) {
      updateQuantity(product._id, 1);
    } else {
      setOrderItems((prevItems) => [...prevItems, newItem]);
    }
  };

  // Update quantity of a product in the cart
  const updateQuantity = (id, increment) => {
    setOrderItems((prevItems) =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + increment } : item
        )
        .filter(item => item.quantity > 0)  // Remove item if quantity goes to 0
    );
  };

  // Remove product from cart
  const removeProduct = (id) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Calculate total price whenever orderItems changes
  useEffect(() => {
    const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [orderItems]);

  // Handle checkout and send order data to backend
  const handleCheckout = async () => {
    const order = {
      userId,           // User ID
      items: orderItems, // All items in the cart
      totalPrice,        // Total price
    };

    try {
      const response = await fetch('http://localhost:3003/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const orderData = await response.json();
        console.log("Order placed successfully!", orderData);
        // Redirect to checkout page with order ID
        // Assuming useNavigate is available
        navigate(`/checkout/${orderData._id}`);
      } else {
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {orderItems.map((item) => (
        <div key={item.id}>
          <img src={item.imageUrl} alt={item.name} />
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, -1)}>-</button>
          <button onClick={() => removeProduct(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total Amount: ${totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
