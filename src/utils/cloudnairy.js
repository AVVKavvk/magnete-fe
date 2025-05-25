export async function uploadImageToCloudinary(file) {
  const url = process.env.REACT_APP_CLOUDNARIY;
  const preset = process.env.REACT_APP_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}
