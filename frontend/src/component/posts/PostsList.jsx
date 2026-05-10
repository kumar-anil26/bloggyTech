import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../alert/LoadingComponent";
import { Link } from "react-router-dom";
import { PostsListAction } from "../../redux/slices/posts/postSlices";
import Errormsg from "../alert/Errormsg";
import { CalendarIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PostsList() {
  const dispatch = useDispatch();

  // Extract 'posts', 'error', and 'loading' from the Redux store
  const { posts, error, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(PostsListAction());
  }, [dispatch]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <section className="py-20 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>

        <div className="container px-4 mx-auto">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Latest Tech Feed
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tighter">
              Trending{" "}
              <span className="text-indigo-400">Engineering Stories</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Discover deep-dives, architectural patterns, and the latest logic
              shared by the community.
            </p>
          </div>

          {/* Posts Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <LoadingComponent />
              </div>
            ) : error ? (
              <div className="col-span-full p-8 bg-red-950/20 border border-red-800/30 rounded-2xl">
                <h2 className="text-red-400 text-center font-bold text-xl">
                  <Errormsg message={error?.message} />
                </h2>
              </div>
            ) : posts?.allPosts?.length <= 0 ? (
              <div className="col-span-full text-center p-20 bg-slate-900/40 rounded-3xl border border-slate-800">
                <h2 className="text-slate-500 text-2xl font-semibold">
                  No posts found in the archives.
                </h2>
              </div>
            ) : (
              posts?.allPosts?.map((post) => (
                <article
                  key={post._id}
                  className="group flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  {/* Post Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={post?.image}
                      alt={post?.title}
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg shadow-lg uppercase tracking-wider">
                        {post?.category?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                  </div>

                  {/* Post Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Date */}
                    <div className="flex items-center text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">
                      <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500" />
                      {new Date(post?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
                      {post?.title}
                    </h2>

                    {/* Short content preview */}
                    <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed font-medium">
                      {post?.content}
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto">
                      <Link
                        to={`/posts/${post._id}`}
                        className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 group/btn shadow-lg"
                      >
                        <span className="mr-2">Explore Story</span>
                        <ArrowRightIcon className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
