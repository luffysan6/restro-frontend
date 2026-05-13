import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

const foodStore = create((set, get) => ({
  foodItems: [],
  cartItems: [],
  totalAmountCart: 0,
  orders: [],
  adminOrders: [],

  getFoodList: async () => {
    const res = await axiosInstance.get("/food");
    set({ foodItems: res.data.data });
  },
  addToCart: async (item) => {
    console.log(item);
    const CurrentValue = get().cartItems; //current Data in Cart

    const existing = CurrentValue.find((items) => items._id == item._id);

    if (existing) {
      set({
        cartItems: CurrentValue.map((a) =>
          a._id == item._id ? { ...a, quantity: a.quantity + 1 } : a,
        ),
      });
      console.log(get().cartItems);

      return;
    }

    set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
    console.log(get().cartItems);
  },
  onDecrease: (item_id) => {
    console.log(item_id);
    const CurrentValue = get().cartItems; //current Data in Cart

    const existing = CurrentValue.find((items) => items._id == item_id);

    if (existing) {
      if (existing.quantity > 1) {
        set({
          cartItems: CurrentValue.map((a) =>
            a._id == item_id ? { ...a, quantity: a.quantity - 1 } : a,
          ),
        });
        console.log(get().cartItems);
      } else {
        set({
          cartItems: CurrentValue.filter((a) => a._id !== item_id),
        });
        console.log(get().cartItems);
      }
    }

    // set({ cartItems: [...get().cartItems, item] });
    // console.log(get().cartItems);
  },
  onIncrease: (item_id) => {
    console.log(item_id);
    const CurrentValue = get().cartItems; //current Data in Cart

    const existing = CurrentValue.find((items) => items._id == item_id);
    console.log(existing);
    if (existing) {
      set({
        cartItems: CurrentValue.map((a) =>
          a._id == item_id ? { ...a, quantity: a.quantity + 1 } : a,
        ),
      });
      console.log(get().cartItems);
    }

    // set({ cartItems: [...get().cartItems, item] });
    // console.log(get().cartItems);
  },
  calculateCartTotals: () => {
    const cartItems = get().cartItems;

    return cartItems.reduce(
      (acc, item) => {
        const qty = item.quantity || 1;

        acc.totalItems += 1;
        acc.totalQuantity += qty;
        acc.totalPrice += item.price * qty;

        return acc;
      },
      {
        totalItems: 0,
        totalQuantity: 0,
        totalPrice: 0,
      },
    );
  },
  CreateOrder: async (totalcart) => {
    try {
      let cartData = get().cartItems;
      const formattedCart = cartData.map((item) => ({
        food: item._id,
        quantity: item.quantity,
      }));

      const res = await axiosInstance.post("/order", {
        items: formattedCart,
        totalAmount: totalcart,
        status: "Pending",
      });
      if (res.data.success === true) {
        set({ cartItems: [], totalcart: 0 });
        alert(`Order Success Order_ID :${res.data.result._id}`);
      }
    } catch (error) {
      console.error("Got en Error ", error.message);
    }
  },
  getOrders: async () => {
    try {
      const res = await axiosInstance.get("/order/user");
      console.log(res.data);
      set({ orders: res.data.orders });
    } catch (error) {
      console.error("Got en Error ", error.message);
      alert("Unexpected Error ");
    }
  },
  getAdminOrders: async () => {
    try {
      const res = await axiosInstance.get("/order");
      console.log(res.data.orders);
      set({ adminOrders: res.data.orders });
    } catch (error) {
      console.error("Got en Error ", error.message);
      alert("Unexpected Error ");
    }
  },
  updateOrderStatus: async ({ order_id, status }) => {
    try {
      const res = await axiosInstance.post(`/order/update/${order_id}`, {
        status,
      });
      console.log(res);
    } catch (error) {
      console.error("Got en Error ", error.message);
      alert("Unexpected Error ");
    }
  },
}));

export default foodStore;
