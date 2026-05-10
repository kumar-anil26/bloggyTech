import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/CategorySlices";
import { createPostAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../alert/LoadingComponent";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";
import {
  PhotoIcon,
  DocumentTextIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function AddPost() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "Title is Required!";
    if (!data.image) errors.image = "Image is Required!";
    if (!data.category) errors.category = "Category is Required!";
    if (!data.content) errors.content = "Content is Required!";
    return errors;
  };

  const handlerBlur = (e) => {
    const formErrors = validateForm(formData);
    const name = e.target.name;
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { error, success, loading } = useSelector((state) => state?.posts);

  const options = categories?.allCategories?.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
    setErrors({ ...errors, category: "" });
  };

  const handlerFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({ ...errors, image: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      dispatch(createPostAction(formData));
      setFormData({ title: "", image: null, category: null, content: "" });
    }
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl transition-all hover:border-slate-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-white font-bold tracking-tight mb-2">
              Deploy a <span className="text-indigo-400">New Story</span>
            </h2>
            <p className="text-slate-400 font-medium">
              Share your technical insights with the global developer community.
            </p>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            {error && <Errormsg message={error.message} />}
            {success && <Successmsg message="Story published successfully!" />}

            {/* Title Input */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                <DocumentTextIcon className="h-4 w-4 text-indigo-400" />
                Story Title
              </label>
              <input
                className="w-full py-3.5 px-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                type="text"
                placeholder="e.g. Mastering React Server Components"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handlerBlur}
              />
              {errors?.title && (
                <p className="mt-2 text-xs text-red-400 ml-1">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Select */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                  <TagIcon className="h-4 w-4 text-indigo-400" />
                  Category
                </label>
                <Select
                  styles={selectStyles}
                  options={options}
                  placeholder="Select niche..."
                  onChange={handleSelectChange}
                />
                {errors.category && (
                  <p className="mt-2 text-xs text-red-400 ml-1">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* File Input */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                  <PhotoIcon className="h-4 w-4 text-indigo-400" />
                  Cover Image
                </label>
                <div className="relative">
                  <input
                    className="w-full py-2 px-4 bg-slate-800 border border-slate-700 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer rounded-xl transition-all"
                    type="file"
                    name="image"
                    onChange={handlerFile}
                  />
                </div>
                {errors?.image && (
                  <p className="mt-2 text-xs text-red-400 ml-1">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>

            {/* Content Textarea */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-slate-300 text-sm font-semibold ml-1">
                <DocumentTextIcon className="h-4 w-4 text-indigo-400" />
                Technical Content
              </label>
              <textarea
                className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all min-h-[200px]"
                placeholder="Write your technical deep-dive here..."
                name="content"
                value={formData.content}
                onChange={handleChange}
                onBlur={handlerBlur}
              />
              {errors?.content && (
                <p className="mt-2 text-xs text-red-400 ml-1">
                  {errors.content}
                </p>
              )}
            </div>

            {/* Submit Button */}
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
                  Publish Story
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
