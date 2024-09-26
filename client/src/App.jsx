import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateListing from "./admin/createListing";
import ProductListing from "./pages/productListing";
import Cart from "./pages/purchasing/cart";
import Checkout from "./pages/purchasing/checkout";
import CategoryListing from "./pages/CategoryListing";
import Login from "./auth/Login";
import Signup from "./auth/signin";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-root-pink ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createlisting" element={<CreateListing />}></Route>
          <Route path="product/:id" element={<ProductListing />}></Route>
          <Route path="/cart/:id" element={<Cart />}></Route>
          <Route path="/buy/:id" element={<Checkout />}></Route>
          <Route
            path="/category/:categoryName"
            element={<CategoryListing />}
          ></Route>
          <Route path="/login" element={<Login/>} ></Route>
          <Route path="/signup" element={<Signup/>} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
