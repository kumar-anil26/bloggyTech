import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPostsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../alert/LoadingComponent";
import { Link } from "react-router-dom";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PublicPosts() {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPublicPostsAction());
  }, [dispatch]);

  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto text-center mb-20">
          <div className="space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
              Engineering Feed
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Latest <span className="text-indigo-400">Tech Insights</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Deep dives into architecture, code optimization, and the future of
              development.
            </p>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingComponent />
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-3xl mx-auto">
            <div className="text-red-400 font-medium text-lg">
              {error?.message || "Failed to load posts"}
            </div>
          </div>
        ) : posts?.posts?.length <= 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 max-w-3xl mx-auto">
            <div className="text-slate-500 font-medium text-xl">
              No stories deployed yet.
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.posts?.map((post) => (
                <article
                  key={post._id}
                  className="group flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 hover:bg-slate-900/60 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-black/50"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={post?.image || "https://via.placeholder.com/800x600"}
                      alt={post?.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-lg uppercase tracking-wider">
                        {post?.category?.name || "Tech"}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <time>
                        {new Date(post?.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                      {post?.title}
                    </h3>

                    <p className="text-slate-400 line-clamp-3 text-sm leading-relaxed mb-6 font-medium">
                      {post?.content}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to={`/posts/${post?._id}`}
                        className="inline-flex items-center text-indigo-400 hover:text-white font-bold transition-all group/link"
                      >
                        <span className="mr-2">Read article</span>
                        <ChevronRightIcon className="h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
