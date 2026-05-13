import { use, useEffect, useState } from "react";
import foodStore from "../store/foodStore";

// const AdminOrdersData = [
//   {
//     _id: "69fb3fcae0b083113f206c49",
//     user: { name: "Jonny Doe", email: "jonny@gmail.com" },
//     items: [{ food: { title: "Chole Bhature", price: 99323 }, quantity: 1 }],
//     totalAmount: 999,
//     status: "CancelByUser",
//     createdAt: "2026-05-06T13:19:06.739Z",
//   },
//   {
//     _id: "69fb3fcde0b083113f206c4a",
//     user: { name: "Jonny Doe", email: "jonny@gmail.com" },
//     items: [{ food: { title: "Chole Bhature", price: 99323 }, quantity: 1 }],
//     totalAmount: 999,
//     status: "Pending",
//     createdAt: "2026-05-06T13:19:09.054Z",
//   },
//   {
//     _id: "6a01ddb31b1e7ba2c49b7053",
//     user: { name: "Jonny Doe", email: "jonny@gmail.com" },
//     items: [
//       { food: { title: "Chole Bhature", price: 99323 }, quantity: 1 },
//       { food: { title: "Chole Bhature", price: 99323 }, quantity: 4 },
//     ],
//     totalAmount: 496615,
//     status: "Pending",
//     createdAt: "2026-05-11T13:46:27.841Z",
//   },
//   {
//     _id: "6a0322c35b536a5281789d80",
//     user: { name: "Jonny Doe", email: "jonny@gmail.com" },
//     items: [
//       { food: { title: "Shahi Paneer", price: 999 }, quantity: 3 },
//       { food: { title: "Ice Cream", price: 199 }, quantity: 3 },
//       { food: { title: "Chole Bhature", price: 99323 }, quantity: 1 },
//     ],
//     totalAmount: 102917,
//     status: "Pending",
//     createdAt: "2026-05-12T12:53:23.862Z",
//   },
//   {
//     _id: "6a0323985b536a5281789d81",
//     user: { name: "Jonny Doe", email: "jonny@gmail.com" },
//     items: [
//       { food: { title: "Chole Bhature", price: 99323 }, quantity: 1 },
//       { food: { title: "Ice Cream", price: 199 }, quantity: 1 },
//     ],
//     totalAmount: 99522,
//     status: "Pending",
//     createdAt: "2026-05-12T12:56:56.962Z",
//   },
// ];

const STATUS_OPTIONS = [
  "Pending",
  "Preparing",
  "OutForDelivery",
  "Delivered",
  "CancelByUser",
  "CancelByAdmin",
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-blue-100 text-blue-800",
  OutForDelivery: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  CancelByUser: "bg-red-100 text-red-800",
  CancelByAdmin: "bg-red-100 text-red-800",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[status] ?? "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}

function OrderRow({ order, onStatusChange }) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [saved, setSaved] = useState(true);

  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    onStatusChange(order._id, selectedStatus);
    setSaved(true);
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Order ID */}
      <td className="px-4 py-3 text-xs text-gray-400 font-mono">
        #{order._id.slice(-8).toUpperCase()}
      </td>

      {/* Customer */}
      <td className="px-4 py-3">
        <p className="text-sm font-semibold text-gray-800">{order.user.name}</p>
        <p className="text-xs text-gray-400">{order.user.email}</p>
      </td>

      {/* Items */}
      <td className="px-4 py-3">
        <ul className="space-y-1">
          {order.items.map((item, i) => (
            <li key={i} className="text-xs text-gray-600">
              {item.food.title}{" "}
              <span className="text-gray-400">× {item.quantity}</span>
            </li>
          ))}
        </ul>
      </td>

      {/* Total */}
      <td className="px-4 py-3 text-sm font-semibold text-gray-800">
        ₹{order.totalAmount.toLocaleString("en-IN")}
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-xs text-gray-400">{formattedDate}</td>

      {/* Current Status Badge */}
      <td className="px-4 py-3">
        <StatusBadge status={order.status} />
      </td>

      {/* Status Dropdown + Save */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={handleChange}
            className="text-xs border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            disabled={saved}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${
              saved
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminOrders() {
  //   const [AdminOrders, setOrders] = useState(AdminOrdersData);
  const { adminOrders = [], getAdminOrders, updateOrderStatus } = foodStore();

  const handleStatusChange = (id, newStatus) => {
    updateOrderStatus({ order_id: id, status: newStatus });
    getAdminOrders();
    // setOrders((prev) =>
    //   prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)),
    // );
  };

  const pendingCount = adminOrders.filter((o) => o.status === "Pending").length;
  const deliveredCount = adminOrders.filter(
    (o) => o.status === "Delivered",
  ).length;
  const cancelledCount = adminOrders.filter((o) =>
    o.status.startsWith("Cancel"),
  ).length;

  useEffect(() => {
    getAdminOrders();
    console.log(adminOrders);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage and update order statuses
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: adminOrders.length, color: "text-gray-800" },
          { label: "Pending", value: pendingCount, color: "text-yellow-600" },
          {
            label: "Delivered",
            value: deliveredCount,
            color: "text-green-600",
          },
          { label: "Cancelled", value: cancelledCount, color: "text-red-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              {[
                "Order ID",
                "Customer",
                "Items",
                "Total",
                "Date",
                "Status",
                "Update",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
