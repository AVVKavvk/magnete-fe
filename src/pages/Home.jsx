import { Link } from "react-router-dom";

const Home = () => (
  <div className="text-center mt-10 px-4">
    <h1 className="text-4xl font-bold mb-4">🎓 Magnete</h1>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
      Magnete is a simple and efficient Student Management System designed to
      help you manage student records, filter by month, search details like
      name, phone, or Aadhaar, and keep everything organized — all in one place.
    </p>
    <Link to="/students/" className="btn btn-primary mb-8">
      View Students
    </Link>

    <div className="text-sm text-gray-300">
      <p className="mb-1">
        📧 Email:{" "}
        <a
          href="mailto:nkkumawat6198@gmail.com"
          className="text-blue-600 underline"
        >
          nkkumawat6198@gmail.com
        </a>
      </p>
      <p className="mb-4">
        📞 Phone:{" "}
        <a href="tel:7976714707" className="text-blue-600 underline">
          7976714707
        </a>
      </p>

      <p className="text-xs text-gray-300">
        Created by Vipin Kumawat (
        <a href="mailto:vipink@replaice.co" className="underline">
          vipink@replaice.co
        </a>
        )
      </p>
    </div>
  </div>
);

export default Home;
