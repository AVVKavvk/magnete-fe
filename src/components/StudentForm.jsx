import { useEffect, useState } from "react";
import { uploadImageToCloudinary } from "../utils/cloudnairy"; // Adjust path if needed

const StudentForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    photo: "",
    aadhaar_photo: "",
    father_name: "",
    address: "",
    amount_paid: false,
    is_active: true,
    ...initialData,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingAadhaar, setUploadingAadhaar] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (field === "photo") setUploadingPhoto(true);
    if (field === "aadhaar_photo") setUploadingAadhaar(true);

    try {
      const url = await uploadImageToCloudinary(file);
      setForm((prev) => ({
        ...prev,
        [field]: url,
      }));
    } catch (error) {
      alert("Image upload failed: " + error.message);
    } finally {
      if (field === "photo") setUploadingPhoto(false);
      if (field === "aadhaar_photo") setUploadingAadhaar(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      {["name", "phone", "aadhaar", "father_name", "address"].map((field) => (
        <input
          key={field}
          className="input input-bordered w-full"
          placeholder={field.replace(/_/g, " ")}
          name={field}
          value={form[field] || ""}
          onChange={handleChange}
          required
        />
      ))}

      {/* Student Photo */}
      <div>
        <label className="block mb-1 font-semibold">Student Photo</label>
        <input
          type="file"
          accept="image/*"
          capture="environment" // opens rear camera on phones
          onChange={(e) => handleImageUpload(e, "photo")}
          disabled={uploadingPhoto}
          required={!form.photo}
          className="file-input file-input-bordered w-full max-w-xs mb-2"
        />
        {uploadingPhoto && (
          <p className="text-sm text-gray-500">Uploading photo...</p>
        )}
        {form.photo && (
          <img
            src={form.photo}
            alt="Student"
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* Aadhaar Photo */}
      <div>
        <label className="block mb-1 font-semibold">Aadhaar Photo</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleImageUpload(e, "aadhaar_photo")}
          disabled={uploadingAadhaar}
          required={!form.aadhaar_photo}
          className="file-input file-input-bordered w-full max-w-xs mb-2"
        />
        {uploadingAadhaar && (
          <p className="text-sm text-gray-500">Uploading Aadhaar photo...</p>
        )}
        {form.aadhaar_photo && (
          <img
            src={form.aadhaar_photo}
            alt="Aadhaar"
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      {/* Amount Paid */}
      <label className="label cursor-pointer bg-gray-900 p-4 rounded-md text-white">
        <span className="label-text">Amount Paid</span>
        <input
          type="checkbox"
          name="amount_paid"
          checked={form.amount_paid}
          onChange={handleChange}
          className="checkbox border-2 border-green-300"
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary ml-16  shadow-md mx-auto flex item-center justify-center text-center"
        disabled={uploadingPhoto || uploadingAadhaar}
      >
        Save
      </button>
    </form>
  );
};

export default StudentForm;
