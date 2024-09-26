import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateListing from "./admin/createListing";

export default function App() {
  return (
    <BrowserRouter>
    <div className="bg-root-pink ">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/createlisting" element={<CreateListing/>} ></Route>
       
      </Routes>
      </div>
    </BrowserRouter>
  );
}
