import authStore from "../store/authStore";
import AdminDashboard from "./AdminDashboard";
import UserDashBoard from "./UserDashBoard";

const Dashboard = () => {
  const { authType } = authStore();
  if (authType == "admin") {
    return (
      <>
        <AdminDashboard />
      </>
    );
  }
  return (
    <>
      <UserDashBoard />
    </>
  );
};

export default Dashboard;
