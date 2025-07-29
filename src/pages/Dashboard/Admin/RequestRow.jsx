import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";
import useAxios from "../../../hooks/useAxios";

const RequestRow = ({ request, refetchKey }) => {
  const axios = useAxios();
  const { role, loading } = useRole();

  if (loading) return null;

  const canEdit = role === "admin";
  // console.log(canEdit);
  
  const canChangeStatus = role === "admin" || role === "volunteer";

  const handleStatusChange = async (newStatus) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `Change status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.patch(`/donation-requests/${request._id}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Status changed successfully.", "success");
        refetchKey && refetchKey();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `This will delete the request permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.delete(`/donation-requests/${request._id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Request has been deleted.", "success");
        refetchKey && refetchKey();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <tr>
      <td>{request.recipientName}</td>
      <td>{request.requesterEmail}</td>
      <td>{request.hospitalName}</td>
      <td>{request.bloodGroup}</td>
      <td>{request.donationDate}</td>
      <td className="capitalize">{request.status}</td>
      <td className="text-right flex gap-2 flex-wrap justify-end">
        {/* ✅ Done / Cancel buttons */}
        {canChangeStatus && request.status === "inprogress" && (
          <>
            <button
              className="btn btn-xs btn-success"
              onClick={() => handleStatusChange("done")}
            >
              Done
            </button>
            <button
              className="btn btn-xs btn-warning"
              onClick={() => handleStatusChange("canceled")}
            >
              Cancel
            </button>
          </>
        )}

        {/* 🛠️ Only for admin */}
        {canEdit && (
          <>
            <button
              className="btn btn-xs btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default RequestRow;
