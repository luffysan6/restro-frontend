import { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import foodStore from "../store/foodStore";
const FloatingCart = ({ cart = [], onIncrease, onDecrease }) => {
  const [open, setOpen] = useState(false);

  const { calculateCartTotals, CreateOrder } = foodStore();
  const result = calculateCartTotals();

  return (
    <>
      <div className="cart-float" onClick={() => setOpen(true)}>
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </div>

      {open && <div className="cart-overlay" onClick={() => setOpen(false)} />}

      <div className={`cart-popup ${open ? "show" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <FaTimes onClick={() => setOpen(false)} />
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-info">
                  <span className="title">{item.title}</span>
                  <span className="price">₹{item.price}</span>
                </div>

                <div className="qty-controls">
                  <button onClick={() => onDecrease(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item._id)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <button
            onClick={() => CreateOrder(result.totalPrice)}
            className="checkout-btn"
          >
            Checkout for ₹{result.totalPrice}
          </button>
        </div>
      </div>
    </>
  );
};
export default FloatingCart;
