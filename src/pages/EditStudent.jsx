import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import StudentForm from "../components/StudentForm";
import { axiosClient } from "../axiosClient";

const EditStudent = () => {
  const { month, id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axiosClient.get(`/students/${month}`).then((res) => {
      const student = res.data.find((s) => s.id === id);
      setInitialData(student);
    });
  }, [month, id]);

  const handleSubmit = async (data) => {
    await axiosClient.put(`/students/${month}/${id}`, data);
    navigate("/students");
  };

  if (!initialData) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Student</h1>
      <StudentForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditStudent;
