import useUserData from "../../hooks/useUserData";
import AdminHome from "./Admin/AdminHome";
const DashboardHome = () => {
  const { userData } = useUserData(); // এখানে userData.role ধরে নিই 'admin' / 'donor' ইত্যাদি

  if (userData?.role === 'admin') {
    console.log(userData);
    
    return <AdminHome />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      {/* Donor or volunteer content */}
    </div>
  );
};

export default DashboardHome;