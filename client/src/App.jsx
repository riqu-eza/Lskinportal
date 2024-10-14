import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateListing from "./admin/createListing";
import ProductListing from "./pages/productListing";
import Cart from "./pages/purchasing/cart";
import Checkout from "./pages/purchasing/checkout";
import CategoryListing from "./pages/CategoryListing";
import Login from "./auth/Login";
import Signup from "./auth/signin";
import Profile from "./auth/Profile";
import { UserProvider } from "./context/UserContext";
import SearchResult from "./features/Search";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import About from "./pages/About";
import NewListing from "./pages/newlisting";
import Popular from "./pages/Popular";

export default function App() {
  return (
    <CartProvider>
      <UserProvider>
        <BrowserRouter>
          <div className="bg-root-pink ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createlisting" element={<CreateListing />}></Route>
              <Route
                path="product/:productId/:userId"
                element={<ProductListing />}
              ></Route>
              <Route path="/cart/:productId/:userId" element={<Cart />}></Route>
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/buy/:productId/:userId"
                element={<Checkout />}
              ></Route>
              <Route path="/checkout/:orderId" element={<Checkout />}></Route>
              <Route
                path="/category/:categoryName"
                element={<CategoryListing />}
              ></Route>
              <Route path="/search" element={<SearchResult />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/About" element={<About />}></Route>
              <Route path="/new-arrival" element={<NewListing />}></Route>
              <Route path="/PopularChoises" element={<Popular/>} ></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </CartProvider>
  );
}
