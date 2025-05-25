import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../axiosClient";

const AddStudent = () => {
  const navigate = useNavigate();

  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().getFullYear();
  console.log(month, year);

  const handleSubmit = async (data) => {
    const collection = `${month} - ${year}`;
    await axiosClient.post(`/students/${collection}`, data);
    navigate("/students");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Student</h1>
      <StudentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddStudent;
