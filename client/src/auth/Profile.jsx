import Header from "../components/header";
import { useUser } from "../context/UserContext";
// import jwt_decode from "jwt-decode";
// import jwt from "jsonwebtoken";
const Profile = () => {
  
  const { currentUser, loading, logout } = useUser();

const user = currentUser;
 


  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }


  return (
    <div className="p-8 bg-gray-100">
      {/* Upper Section */}
      <Header />
      <div className="flex justify-between items-center mb-8">
        <button onClick={logout}className="text-red-500">
          Logout
        </button>
        <h2 className="text-2xl font-bold">My Account</h2>
        <div className="hidden"></div>
      </div>
      <h3 className="text-xl">
        {user.firstName} {user.lastName}
      </h3>

      {/* Main Section */}
      <div className="flex mt-8">
        {/* Left Section: My Orders */}
        <div className="w-2/3 pr-4">
          <h3 className="text-lg font-semibold">My Orders</h3>
          <ul className="mt-4">
            {user.orders &&
              user.orders.map((order) => (
                <li
                  key={order.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{order.productName}</span>
                  <span>Quantity: {order.quantity}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Right Section: Address Information */}
        <div className="w-1/3 pl-4 border-l">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div className="mt-4">
            <p>{user.address.street}</p>
            <p>
              {user.address.city}, {user.address.state} {user.address.zip}
            </p>
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Edit Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
