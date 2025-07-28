import { Link } from "react-router";
import AdminHome from "./Admin/AdminHome";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserData from "../../hooks/useUserData";

const DashboardHome = () => {
    const { userData } = useUserData();
    const axios = useAxios();


    // Fetch recent 3 donation requests for donor
    const { data = [], refetch, isLoading } = useQuery({
        enabled: !!userData?.email,
        queryKey: ["recent-donation-requests", userData?.email],
        queryFn: async () => {
            const res = await axios.get(
                `/donation-requests?email=${userData.email}&limit=3`
            );
            return res.data?.requests || [];
        },
    });
    // Show admin or volunteer dashboard
    if (userData?.role === "admin" || userData?.role === "volunteer") {
        return <AdminHome role={userData.role} />;
    }

    const handleUpdateStatus = async (id, status) => {
        const res = await axios.patch(`/donation-requests/${id}`, { status });
        if (res.data.modifiedCount) {
            Swal.fire("Success", `Marked as ${status}`, "success");
            refetch();
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (confirm.isConfirmed) {
            await axios.delete(`/donation-requests/${id}`);
            Swal.fire("Deleted!", "Request deleted successfully.", "success");
            refetch();
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Welcome {userData?.name || "Donor"} 👋
            </h2>

            {/* Recent 3 Requests */}
            {data.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Your Recent Requests</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Group</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.recipientName}</td>
                                        <td>
                                            {request.recipientDistrict}, {request.recipientUpazila}
                                        </td>
                                        <td>{request.donationDate}</td>
                                        <td>{request.donationTime}</td>
                                        <td>{request.bloodGroup}</td>
                                        <td className="capitalize">{request.status}</td>
                                        <td className="flex gap-2 justify-end">
                                            <Link
                                                to={`/dashboard/donation-request/view/${request._id}`}
                                                className="btn btn-sm btn-outline"
                                            >
                                                View
                                            </Link>
                                            {request.status === "inprogress" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(request._id, "done")
                                                        }
                                                        className="btn btn-sm btn-success"
                                                    >
                                                        Done
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleUpdateStatus(request._id, "canceled")
                                                        }
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            <Link
                                                to={`/dashboard/edit-donation-request/${request._id}`}
                                                className="btn btn-sm btn-info"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(request._id)}
                                                className="btn btn-sm btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* View All Requests Button */}
                    <div className="text-right">
                        <Link to="/dashboard/my-donation-requests" className="btn btn-primary">
                            View My All Requests
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
