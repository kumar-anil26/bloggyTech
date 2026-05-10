import { useEffect, useRef } from "react";
import { FiUpload, FiMail, FiCalendar, FiUsers, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPrivateProfileAction,
  updateCoverImageAction,
  updateProfilePictureAction,
} from "../../redux/slices/users/userSlices";
import LoadingComponent from "../alert/LoadingComponent";
import Errormsg from "../alert/Errormsg";
import PrivatePostsList from "../posts/PrivatePostsList";

export default function PrivateUserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { profile, loading, error } = useSelector((state) => state?.users);
  const fileInputRef = useRef(null);
  const uploadTarget = useRef("");

  useEffect(() => {
    dispatch(getPrivateProfileAction());
  }, [dispatch, userId]);

  const user = profile?.userdata;

  const handleUploadClick = (type) => {
    uploadTarget.current = type;
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = { file, userId };

    if (uploadTarget.current === "profilePicture") {
      await dispatch(updateProfilePictureAction({ data })).unwrap();
    } else {
      await dispatch(updateCoverImageAction({ data })).unwrap();
    }
    dispatch(getPrivateProfileAction());
  };

  if (loading) return <LoadingComponent />;
  if (error) return <Errormsg message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      <div className="max-w-6xl mx-auto bg-white shadow-sm overflow-hidden md:rounded-b-2xl">
        {/* --- Header Section --- */}
        <div className="relative h-48 md:h-64 bg-gray-200">
          <img
            className="w-full h-full object-cover"
            src={
              user?.coverImage ||
              "https://images.unsplash.com/photo-1557683316-973673baf926"
            }
            alt="Cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity hover:bg-black/20" />
          <button
            onClick={() => handleUploadClick("coverImage")}
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-md transition-all text-sm font-medium"
          >
            <FiUpload /> Change Cover
          </button>
        </div>

        {/* --- Profile Branding --- */}
        <div className="relative px-4 sm:px-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end -mt-16 md:-mt-20 gap-6">
            <div className="relative group">
              <img
                className="h-32 w-32 md:h-40 md:w-40 rounded-2xl ring-8 ring-white object-cover shadow-xl bg-white"
                src={user?.profilePicture || "https://via.placeholder.com/150"}
                alt="Avatar"
              />
              <button
                onClick={() => handleUploadClick("profilePicture")}
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiUpload className="text-2xl" />
              </button>
            </div>

            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.username}
              </h1>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <FiMail className="inline" /> {user?.email}
              </p>
            </div>

            <div className="flex gap-3 pb-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all font-semibold text-sm">
                Edit Profile
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm">
                <FiEye /> {user?.profileViewers?.length || 0}
              </div>
            </div>
          </div>

          {/* --- Stats Cards --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              {
                label: "Followers",
                value: user?.followers?.length || 0,
                icon: <FiUsers className="text-blue-500" />,
              },
              {
                label: "Following",
                value: user?.following?.length || 0,
                icon: <FiUsers className="text-purple-500" />,
              },
              {
                label: "Joined",
                value: new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
                icon: <FiCalendar className="text-orange-500" />,
              },
              {
                label: "Posts",
                value: user?.posts?.length || 0,
                icon: <FiUpload className="text-green-500" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="p-2 bg-white rounded-lg shadow-sm text-lg">
                    {stat.icon}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-900 ml-11">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Posts Section --- */}
      <div className="max-w-6xl mx-auto mt-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Your Activity
          </h2>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <PrivatePostsList posts={user?.posts} loading={loading} error={error} />
      </div>
    </div>
  );
}
