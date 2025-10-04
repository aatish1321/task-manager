import React, { useContext, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Input from "../../components/Inputs/Input";
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineCamera, HiOutlineCheck } from "react-icons/hi2";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const Settings = () => {
  useUserAuth();
  const { user, updateUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImageUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError("");
    setSuccess("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let profileImageUrl = user?.profileImageUrl || "";

      // Upload new image if selected
      if (profileImage) {
        const imgUploadRes = await uploadImage(profileImage);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      // Update profile
      const response = await axiosInstance.put(API_PATHS.USERS.UPDATE_USER(user?.id), {
        name: formData.name,
        email: formData.email,
        profileImageUrl,
      });

      updateUser({ ...user, ...response.data });
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.USERS.UPDATE_USER(user?.id), {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setSuccess("Password changed successfully!");
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Password change error:", error);
      setError(error.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-2">
            Settings
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="card">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-primary-200 dark:ring-primary-700">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 text-white font-bold text-3xl">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200">
                <HiOutlineCamera className="text-white text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-text mb-1">
                Profile Picture
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Click the camera icon to upload a new photo
              </p>
              <button
                onClick={() => {
                  setProfileImage(null);
                  setPreviewUrl(user?.profileImageUrl || "");
                }}
                className="text-sm text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 transition-colors duration-200"
              >
                Reset to default
              </button>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-700 rounded-xl">
            <p className="text-sm text-error-600 dark:text-error-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-xl">
            <p className="text-sm text-success-600 dark:text-success-400 flex items-center gap-2">
              <HiOutlineCheck className="text-base" />
              {success}
            </p>
          </div>
        )}

        {/* Profile Information Form */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
              <HiOutlineUser className="text-primary-600 dark:text-primary-400 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-text">
                Profile Information
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Update your personal details
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                value={formData.name}
                onChange={({ target }) => handleInputChange('name', target.value)}
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
                required
              />

              <Input
                value={formData.email}
                onChange={({ target }) => handleInputChange('email', target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Updating...
                </>
              ) : (
                <>
                  <HiOutlineCheck className="text-base" />
                  Update Profile
                </>
              )}
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900/20 rounded-xl flex items-center justify-center">
              <HiOutlineLockClosed className="text-warning-600 dark:text-warning-400 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-dark-text">
                Change Password
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Update your password for security
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                value={formData.currentPassword}
                onChange={({ target }) => handleInputChange('currentPassword', target.value)}
                label="Current Password"
                placeholder="Enter current password"
                type="password"
                required
              />

              <Input
                value={formData.newPassword}
                onChange={({ target }) => handleInputChange('newPassword', target.value)}
                label="New Password"
                placeholder="Enter new password"
                type="password"
                required
              />

              <Input
                value={formData.confirmPassword}
                onChange={({ target }) => handleInputChange('confirmPassword', target.value)}
                label="Confirm Password"
                placeholder="Confirm new password"
                type="password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-secondary flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Changing...
                </>
              ) : (
                <>
                  <HiOutlineLockClosed className="text-base" />
                  Change Password
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
