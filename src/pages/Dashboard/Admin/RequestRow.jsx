// src/components/RequestRow.jsx
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const RequestRow = ({ request, refetchKey }) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const {
    _id,
    requesterName,
    requesterEmail,
    recipientName,
    hospitalName,
    bloodGroup,
    donationDate,
    status,
  } = request;

  const handleStatusUpdate = async () => {
    const { value: newStatus } = await Swal.fire({
      title: "Change Status",
      input: "select",
      inputOptions: {
        pending: "Pending",
        inprogress: "In Progress",
        done: "Done",
        canceled: "Canceled",
      },
      inputPlaceholder: "Select new status",
      showCancelButton: true,
    });

    if (newStatus) {
      try {
        await axios.patch(`/donation-requests/${_id}`, { status: newStatus });
        Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
        queryClient.invalidateQueries([refetchKey]);
      } catch (err) {
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/donation-requests/${_id}`);
        Swal.fire("Deleted!", "Request has been removed.", "success");
        queryClient.invalidateQueries([refetchKey]);
      } catch (err) {
        Swal.fire("Error", "Failed to delete request", "error");
      }
    }
  };

  return (
    <tr>
      <td>{recipientName}</td>
      <td>
        <div>
          <p className="font-medium">{requesterName}</p>
          <p className="text-sm text-gray-500">{requesterEmail}</p>
        </div>
      </td>
      <td>{hospitalName}</td>
      <td>
        <span className="badge badge-outline">{bloodGroup}</span>
      </td>
      <td>{donationDate}</td>
      <td>
        <span className="capitalize badge badge-info">{status}</span>
      </td>
      <td className="flex justify-end gap-2">
        <button onClick={handleStatusUpdate} className="btn btn-sm btn-info">
          <FaEdit />
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-error">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default RequestRow;
