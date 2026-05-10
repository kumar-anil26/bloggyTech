import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostAction,
  getPostAction,
} from "../../redux/slices/posts/postSlices";
import { fetchCategoriesAction } from "../../redux/slices/categories/CategorySlices";
import LoadingComponent from "../alert/LoadingComponent";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";
import { useParams, useNavigate } from "react-router-dom";
import {
  PencilIcon,
  PhotoIcon,
  TagIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const { categories } = useSelector((state) => state.categories);
  const { post, error, success, loading } = useSelector(
    (state) => state?.posts
  );

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  // Pre-populate data when post is fetched
  useEffect(() => {
    dispatch(getPostAction(id));
    dispatch(fetchCategoriesAction());
  }, [id, dispatch]);

  useEffect(() => {
    if (post?.post) {
      setFormData({
        title: post?.post?.title,
        content: post?.post?.content,
        category: post?.post?.category?._id,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };

  const handlerFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlerUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePostAction({ formData, id }));
  };

  // Redirect on success
  useEffect(() => {
    if (success === "success") {
      setTimeout(() => navigate(`/posts/${id}`), 2000);
    }
  }, [success, navigate, id]);

  const options = categories?.allCategories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  // Custom styles for React Select to match Dark Mode
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderColor: state.isFocused ? "#6366f1" : "#334155",
      borderRadius: "0.75rem",
      padding: "2px",
      color: "white",
      boxShadow: "none",
      "&:hover": { borderColor: "#475569" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      borderRadius: "0.75rem",
      border: "1px solid #334155",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#4f46e5" : "transparent",
      color: "white",
      "&:active": { backgroundColor: "#6366f1" },
    }),
    singleValue: (base) => ({ ...base, color: "white" }),
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

      <form onSubmit={handlerUpdate} className="w-full max-w-3xl">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-2">
              Refine your <span className="text-indigo-400">Logic</span>
            </h2>
            <p className="text-slate-400 font-medium">
              Update your story to keep the community informed with the latest
              tech.
            </p>
          </div>

          <div className="space-y-6">
            {error && <Errormsg message={error.message} />}
            {success === "success" && (
              <Successmsg message="Posts Updated successfully! Redirecting..." />
            )}

            {/* Title */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                <PencilIcon className="h-4 w-4 text-indigo-400" />
                Update Title
              </label>
              <input
                className="w-full py-3.5 px-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                  <TagIcon className="h-4 w-4 text-indigo-400" />
                  Category
                </label>
                <Select
                  styles={selectStyles}
                  options={options}
                  onChange={handleSelectChange}
                  value={options?.find(
                    (opt) => opt.value === formData.category
                  )}
                />
              </div>

              {/* Image */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                  <PhotoIcon className="h-4 w-4 text-indigo-400" />
                  Change Image
                </label>
                <input
                  className="w-full py-2 px-4 bg-slate-800 border border-slate-700 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer rounded-xl transition-all"
                  type="file"
                  name="image"
                  onChange={handlerFile}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                <DocumentTextIcon className="h-4 w-4 text-indigo-400" />
                Story Content
              </label>
              <textarea
                className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[250px]"
                name="content"
                value={formData.content}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              {loading ? (
                <div className="flex justify-center">
                  <LoadingComponent />
                </div>
              ) : (
                <button
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all"
                  type="submit"
                >
                  Update & Deploy
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
