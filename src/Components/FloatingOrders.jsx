import { useState, useEffect } from "react";
import { FaClipboardList, FaTimes, FaChevronDown } from "react-icons/fa";
import foodStore from "../store/foodStore";

const FloatingOrders = () => {
  const [open, setOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  const { orders = [], getOrders } = foodStore();

  useEffect(() => {
    getOrders();
  }, []);

  const toggleOrder = (id) => {
    setActiveOrder(activeOrder === id ? null : id);
  };

  return (
    <>
      {/* Button */}
      <div className="orders-float" onClick={() => setOpen(true)}>
        <FaClipboardList />
        {orders.length > 0 && (
          <span className="cart-badge">{orders.length}</span>
        )}
      </div>

      {open && <div className="cart-overlay" onClick={() => setOpen(false)} />}

      <div className={`cart-popup ${open ? "show" : ""}`}>
        <div className="cart-header">
          <h3>Your Orders</h3>
          <FaTimes onClick={() => setOpen(false)} />
        </div>

        <div className="cart-body">
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="order-card">
                {/* SUMMARY (clean) */}
                <div
                  className="order-summary"
                  onClick={() => toggleOrder(order._id)}
                >
                  <div>
                    <strong>#{order._id.slice(-5)}</strong>
                    <p className="order-date">
                      Order Date :{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      Order Status {order.status}
                    </span>
                    <p className="total">
                      Total Order Value :₹{order.totalAmount}
                    </p>
                  </div>

                  <FaChevronDown
                    className={`arrow ${
                      activeOrder === order._id ? "rotate" : ""
                    }`}
                  />
                </div>

                {/* DETAILS (collapsible) */}
                {activeOrder === order._id && (
                  <div className="order-details">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span>{item.food.title}</span>
                        <span>
                         s {item.quantity} × ₹{item.food.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FloatingOrders;
