import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FloatingCart from "../Components/FloatingCart ";
// import foodStore from "../store/foodStore";
import { axiosInstance } from "../utils/axios";
import foodStore from "../store/foodStore";
import FloatingOrders from "../Components/FloatingOrders";

const UserDashBoard = () => {
  const { cartItems, onIncrease, onDecrease } = foodStore();
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState();

  // Fetch food
  useEffect(() => {
    const fetchFoods = async () => {
      const res = await axiosInstance.get("/food"); // change URL
      setFoods(res.data.data);
      console.log(cartItems);
    };

    fetchFoods();
  }, []);

  // Add to cart
  // const handleAddToCart = (item) => {
  //   setCart((prev) => {
  //     const existing = prev.find((i) => i._id === item._id);

  //     if (existing) {
  //       return prev.map((i) =>
  //         i._id === item._id ? { ...i, qty: i.qty + 1 } : i,
  //       );
  //     }

  //     return [...prev, { ...item, qty: 1 }];
  //   });
  // };

  // Increase qty
  // const handleIncrease = (id) => {
  //   setCart((prev) =>
  //     prev.map((item) =>
  //       item._id === id ? { ...item, qty: item.qty + 1 } : item,
  //     ),
  //   );
  // };

  // Decrease qty
  // const handleDecrease = (id) => {
  //   setCart((prev) =>
  //     prev
  //       .map((item) =>
  //         item._id === id ? { ...item, qty: item.qty - 1 } : item,
  //       )
  //       .filter((item) => item.qty > 0),
  //   );
  // };

  return (
    <div className="h-screen w-full">
      <FoodList data={foods} />

      <FloatingCart
        cart={cartItems}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
      <FloatingOrders />  
    </div>
  );
};

const FoodCard = ({ item }) => {
  const { addToCart } = foodStore();
  return (
    <div className="food-card">
      <img
        src={item.images?.[0] || "https://placehold.co/600x400/EEE/31343C"}
        alt={item.title}
        className="food-image"
      />

      <div className="food-content">
        <h3>
          {item.title} - {item.category}
        </h3>
        <p>{item.description}</p>

        <div className="food-footer">
          <span className="price">₹{item.price}</span>

          <button
            className="add-btn"
            onClick={() => addToCart({ ...item, quantity: 1 })}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodList = ({ data }) => {
  return (
    <div className="food-list">
      {data.map((item) => (
        <FoodCard key={item._id} item={item} />
      ))}
    </div>
  );
};
export default UserDashBoard;
