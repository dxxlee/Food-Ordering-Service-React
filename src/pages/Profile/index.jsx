import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(null); // State for the avatar image
  const [preview, setPreview] = useState(null); // State for image preview
  const [imageFile, setImageFile] = useState(null); // State for the image file to upload
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("User"));
    setUserData(user);
    setIs2FAEnabled(user?.twoFactorEnabled);
    setAvatar(user?.avatarUrl);
  }, []);

  // Handle file selection and preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload avatar to the server
  const handleAvatarUpload = async () => {
    if (!imageFile) {
      toast.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", imageFile);

    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/upload-avatar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAvatar(result.avatarUrl);
        toast.success("Avatar updated successfully!");
      } else {
        toast.error("Failed to upload avatar.");
      }
    } catch (err) {
      toast.error("Error uploading avatar");
    }
  };

  const toggle2FA = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/toggle-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setIs2FAEnabled(result.twoFactorEnabled);
        toast.success(
          result.twoFactorEnabled
            ? "Two-Factor Authentication enabled!"
            : "Two-Factor Authentication disabled!"
        );
      } else {
        const error = await response.json();
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold mb-8 text-center text-green-600">Profile</h2>

      {/* Avatar Section */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
          <img
            src={preview || avatar || "/default-avatar.png"}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <input
          type="file"
          onChange={handleAvatarChange}
          className="ml-4 cursor-pointer mt-6"
        />
      </div>
      {/* Preview and Save Button */}
      {preview && (
        <div className="flex justify-center">
          <button
            onClick={handleAvatarUpload}
            className="px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            Save Avatar
          </button>
        </div>
      )}

      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
        <p className="text-lg"><strong>Name:</strong> {userData?.name}</p>
        <p className="text-lg"><strong>Email:</strong> {userData?.email}</p>
        <p className="text-lg">
          <strong>Two-Factor Authentication:</strong>{" "}
          {is2FAEnabled ? "Enabled" : "Disabled"}
        </p>
      </div>

      {/* Toggle 2FA */}
      <div className="flex justify-center">
        <button
          onClick={toggle2FA}
          disabled={isLoading}
          className="w-full max-w-sm px-4 py-2 text-lg font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {isLoading
            ? "Processing..."
            : is2FAEnabled
            ? "Disable 2FA"
            : "Enable 2FA"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
