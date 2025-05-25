import { Link } from "react-router-dom";
import { axiosClient } from "../axiosClient";
import { useState } from "react";

const StudentCard = ({ student, month }) => {
  const [paid, setPaid] = useState(student.amount_paid);
  const [active, setActive] = useState(student.is_active);
  const [seat, setSeat] = useState(student.seat_number);

  const [editingSeat, setEditingSeat] = useState(false);
  const [newSeat, setNewSeat] = useState(seat);

  const togglePayment = async () => {
    try {
      await axiosClient.patch(`/students/${month}/${student.id}/payment`, {
        amount_paid: !paid,
      });
      setPaid(!paid);
    } catch (err) {
      console.error("Failed to update payment status", err);
    }
  };

  const toggleActive = async () => {
    try {
      await axiosClient.patch(`/students/${month}/${student.id}/status`, {});
      setActive(!active);
    } catch (err) {
      console.error("Failed to update active status", err);
    }
  };

  const handleSeatUpdate = async () => {
    if (isNaN(newSeat)) {
      alert("Please enter a valid number");
      return;
    }

    try {
      await axiosClient.patch(`/students/${month}/${student.id}/seat`, {
        seat_number: parseInt(newSeat),
      });
      setSeat(parseInt(newSeat));
      setEditingSeat(false);
    } catch (err) {
      console.error("Failed to update seat number", err);
    }
  };

  return (
    <div
      className={`card  min-w-[300px] md:min-w-[500px] bg-base-100 shadow-md p-4 w-full border border-gray-300 rounded-md flex flex-col justify-center items-center ${
        !active ? "opacity-50" : ""
      }`}
    >
      <img
        src={student.photo}
        alt={student.name}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />

      <h2 className="text-xl font-bold text-center">{student.name}</h2>
      <p className="text-center">Phone: {student.phone}</p>
      <p className="text-center">Aadhaar: {student.aadhaar}</p>

      {editingSeat ? (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            value={newSeat}
            onChange={(e) => setNewSeat(e.target.value)}
            className="input input-sm input-bordered w-24"
          />
          <button className="btn btn-sm btn-success" onClick={handleSeatUpdate}>
            Save
          </button>
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              setEditingSeat(false);
              setNewSeat(seat);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-center font-semibold mt-2">
          Seat: {seat}{" "}
          <button
            className="btn btn-xs btn-outline btn-accent ml-2"
            onClick={() => setEditingSeat(true)}
          >
            Update
          </button>
        </p>
      )}

      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        <Link
          to={`/edit/${month}/${student.id}`}
          className="btn btn-sm btn-info"
        >
          Edit
        </Link>

        <button
          className={`btn btn-sm ${paid ? "btn-success" : "btn-error"}`}
          onClick={togglePayment}
        >
          {paid ? "Amount Paid" : "Not Paid"}
        </button>

        <button
          className={`btn btn-sm ${active ? "btn-warning" : "btn-primary"}`}
          onClick={toggleActive}
        >
          {active ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
