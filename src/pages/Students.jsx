import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import { axiosClient } from "../axiosClient";
import useAuthStore from "../store/useStore";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [month, setMonth] = useState(null);
  const [allMonths, setAllMonths] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isAdmin } = useAuthStore();
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    aadhaar: "",
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Get all months
  useEffect(() => {
    const getAllMonths = async () => {
      const res = await axiosClient.get("/collections");
      setAllMonths(res.data.collections ?? []);
    };
    getAllMonths();
  }, []);

  // Fetch students by selected month
  useEffect(() => {
    if (!month) return;

    setLoading(true);
    axiosClient.get(`/students/${month}`).then((res) => {
      setStudents(res.data);
      setFiltered(res.data); // set filtered = full on load
      setLoading(false);
      console.log(res.data);
    });
  }, [month]);

  // Apply filters on frontend
  useEffect(() => {
    const { name, phone, aadhaar } = filters;
    const result = students.filter((s) => {
      return (
        s.name.toLowerCase().includes(name.toLowerCase()) &&
        s.phone.includes(phone) &&
        s.aadhaar.includes(aadhaar)
      );
    });
    setFiltered(result);
  }, [filters, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-base-200">
        You are not an admin
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students {month && `- ${month}`}</h2>
      </div>

      {/* Month Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {allMonths.map((m) => (
          <button
            key={m}
            className={`btn ${m === month ? "btn-primary" : "btn-outline"}`}
            onClick={() => setMonth(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Search Filters */}
      {month && (
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Search Name"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Search Phone"
            className="input input-bordered"
            onChange={handleChange}
          />
          <input
            type="text"
            name="aadhaar"
            placeholder="Search Aadhaar"
            className="input input-bordered"
            onChange={handleChange}
          />
        </div>
      )}

      {/* Loading */}
      {loading && <p className="text-center">Loading students...</p>}

      {/* Student List */}
      {!loading && filtered && filtered.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {filtered.map((student) => (
            <div key={student.id} className="">
              {student?.is_active && (
                <StudentCard student={student} month={month} />
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        month && (
          <p className="text-center text-gray-500 mt-4">No students found.</p>
        )
      )}
    </div>
  );
};

export default Students;
