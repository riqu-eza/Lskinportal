import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const { productId, userId } = useParams();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(true); // Open the cart by default

  // Fetch product details and add it to order when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:3003/api/listing/products/${productId}`
      );
      const product = await response.json();
      addProductToOrder(product);
    };

    if (productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Load cart from local storage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderItems(storedCart);
  }, []);

  // Save cart to local storage whenever orderItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(orderItems));
    const total = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [orderItems]);

  // Add product to order items
  const addProductToOrder = (product) => {
    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const existingItem = orderItems.find((item) => item.id === product._id);
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
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + increment }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeProduct = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle checkout and send order data to backend

  const handleCheckout = async () => {
    const order = {
      userId,
      items: orderItems,
      totalPrice,
    };
    console.log("order", order);
    try {
      const response = await fetch("http://localhost:3003/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const orderData = await response.json();
        console.log("orderData", orderData);
        navigate(`/checkout/${orderData._id}`);
        console.log("orderid", orderData._id);
        setOrderItems([]); 
        localStorage.removeItem("cart");
      } else {
        console.error("Error placing order");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  // Close the cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50">
          <div className="bg-white w-72 shadow-lg p-4 h-full overflow-y-auto">
            <button
              onClick={closeCart}
              className="absolute top-2 left-2 text-red-500"
            >
              Close
            </button>
            <h1>Your Cart</h1>
            {orderItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between my-2"
                >
                  <img
                    src={item.imageUrls}
                    alt={item.name}
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
            <h2 className="mt-4">Total Amount: ${totalPrice}</h2>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white mt-2 p-2"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
