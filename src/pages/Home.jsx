import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center mt-10">
    <h1 className="text-3xl font-bold">Student Management System</h1>
    <Link to="/students/April-2025" className="btn btn-primary mt-4">
      View Students
    </Link>
  </div>
);

export default Home;
