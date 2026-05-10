import { useEffect, useRef } from "react";
import {
  FiUpload,
  FiUserPlus,
  FiUserMinus,
  FiSlash,
  FiUnlock,
  FiEye,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPublicProfileAction,
  updateCoverImageAction,
  updateProfilePictureAction,
  userBlockAction,
  userFollowAction,
  userUnFollowAction,
} from "../../redux/slices/users/userSlices";
import LoadingComponent from "../alert/LoadingComponent";
import Errormsg from "../alert/Errormsg";
import PrivatePostsList from "../posts/PrivatePostsList";

export default function PublicUserProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { profile, loading, error } = useSelector((state) => state?.users);

  // File upload refs
  const fileInputRef = useRef(null);
  const uploadType = useRef("");

  useEffect(() => {
    dispatch(getPublicProfileAction(userId));
  }, [dispatch, userId]);

  const user = profile?.userdata;

  // Actions
  const handleAction = async (action) => {
    await dispatch(action(userId));
    dispatch(getPublicProfileAction(userId));
  };

  const triggerUpload = (type) => {
    uploadType.current = type;
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = { file, userId };

    if (uploadType.current === "profilePicture") {
      await dispatch(updateProfilePictureAction({ data })).unwrap();
    } else {
      await dispatch(updateCoverImageAction({ data })).unwrap();
    }
    dispatch(getPublicProfileAction(userId));
  };

  if (loading) return <LoadingComponent />;
  if (error) return <Errormsg message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hidden File Input */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <div className="max-w-6xl mx-auto">
        {/* --- Header & Images --- */}
        <div className="relative h-60 md:h-80 w-full overflow-hidden shadow-lg md:rounded-b-3xl">
          <img
            className="w-full h-full object-cover"
            src={
              user?.coverImage ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }
            alt="Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button
            onClick={() => triggerUpload("coverImage")}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-xl border border-white/30 transition-all text-sm font-medium"
          >
            <FiUpload /> Change Cover
          </button>
        </div>

        {/* --- Profile Info Section --- */}
        <div className="px-4 sm:px-8">
          <div className="relative flex flex-col md:flex-row md:items-end -mt-16 md:-mt-24 gap-6 mb-8">
            {/* Avatar */}
            <div className="relative group mx-auto md:mx-0">
              <img
                className="h-32 w-32 md:h-44 md:w-44 rounded-3xl ring-8 ring-white object-cover shadow-2xl bg-white"
                src={user?.profilePicture || "https://via.placeholder.com/150"}
                alt="Avatar"
              />
              <button
                onClick={() => triggerUpload("profilePicture")}
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiUpload className="text-2xl" />
              </button>
            </div>

            {/* Identity & Actions */}
            <div className="flex-1 text-center md:text-left space-y-1">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {user?.username}
              </h1>
              <p className="text-gray-500 font-medium">{user?.email}</p>
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pb-2">
              <button
                onClick={() => handleAction(userFollowAction)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 transition-all font-bold"
              >
                <FiUserPlus /> Follow
              </button>

              <button
                onClick={() => handleAction(userUnFollowAction)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-all font-bold"
              >
                <FiUserMinus /> Unfollow
              </button>

              <button
                onClick={() => handleAction(userBlockAction)}
                className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                title="Block User"
              >
                <FiSlash size={20} />
              </button>
            </div>
          </div>

          {/* --- Metrics Grid --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                label: "Followers",
                value: user?.followers?.length || 0,
                color: "bg-blue-50 text-blue-600",
              },
              {
                label: "Following",
                value: user?.following?.length || 0,
                color: "bg-purple-50 text-purple-600",
              },
              {
                label: "Views",
                value: user?.profileViewers?.length || 0,
                color: "bg-amber-50 text-amber-600",
              },
              {
                label: "Posts",
                value: user?.posts?.length || 0,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center"
              >
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${stat.color}`}
                >
                  {stat.label}
                </span>
                <p className="text-3xl font-black text-gray-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* --- Activity Section --- */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
              <PrivatePostsList
                posts={user?.posts}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
