import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { axiosClient } from "../axiosClient";
import { Navigate, useNavigate } from "react-router-dom";

const MigrateForm = () => {
  const [collections, setCollections] = useState([]);
  const [fromMonth, setFromMonth] = useState("");
  const [toMonth, setToMonth] = useState("");
  const navigate = useNavigate();

  // Get current and next month strings
  const getCurrentAndNextMonth = () => {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const format = (date) =>
      `${date.toLocaleString("default", {
        month: "long",
      })} - ${date.getFullYear()}`;

    return [format(now), format(next)];
  };

  const [currentMonth, nextMonth] = getCurrentAndNextMonth();

  useEffect(() => {
    axiosClient
      .get("/collections")
      .then((res) => {
        setCollections(res.data.collections || []);
      })
      .catch(() => toast.error("Failed to load collections"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromMonth || !toMonth) {
      toast.error("Please select both months");
      return;
    }

    try {
      const res = await axiosClient.post("/students/migrate", {
        from: fromMonth,
        to: toMonth,
      });

      toast.success(res.data.message || "Migration successful");
      navigate("/students");
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Migration failed. Check server logs."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Migrate Students</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* From Month Dropdown */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">From</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={fromMonth}
            onChange={(e) => setFromMonth(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a month
            </option>
            {collections.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* To Month Dropdown */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">To</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={toMonth}
            onChange={(e) => setToMonth(e.target.value)}
            required
          >
            <option value="" disabled>
              Select target month
            </option>
            {[currentMonth, nextMonth].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Migrate
        </button>
      </form>
    </div>
  );
};

export default MigrateForm;
