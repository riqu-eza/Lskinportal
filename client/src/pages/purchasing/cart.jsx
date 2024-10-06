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
    navigate(-1);
  };

  return (
    <div>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-start z-50">
          <div className="bg-white w-[500px] shadow-lg p-4 h-full overflow-y-auto">
            <button
              onClick={closeCart}
              className="absolute top-2 left-2 text-red-500"
            >
              Close
            </button>
            <h1 className="text-center text-xl bg-gray-300 rounded-sm" >Your Cart</h1>
            {orderItems.length === 0 ? (
              <p className="text-blue-400 p-20 m-10 text-2xl" >#Your cart is empty.</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-gray-200 rounded-md shadow-md justify-between my-2"
                >
                  <img
                    src={item.imageUrls}
                    alt={item.name}
                    className="w-32 border-2 m-3  border-black h-28"
                  />
                  <div className="flex border-2 bg-gray-300 p-2 m-1 rounded-sm shadow-sm flex-col">
                    <p className=" text-bold text-2xl" >{item.name}</p>
                    <p className=" text-black text-xl " >Price: <span className=" text-green-500 " >  ${item.price}</span></p>
                    <div className="flex m-2 items-center">
                      <button className="text-2xl" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                      <span className="px-4" >{item.quantity}</span>
                      <button className="text-5xl" onClick={() => updateQuantity(item.id, -1)}>
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
            <h2 className="mt-4 text-black  text-bold text-xl ">Total Amount: <span className="text-green-500" >${totalPrice}</span> </h2>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 rounded-md text-white mt-2 p-2"
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
