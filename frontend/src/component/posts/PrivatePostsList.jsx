import React from "react";
import LoadingComponent from "../alert/LoadingComponent";
import { Link } from "react-router-dom";
import Errormsg from "../alert/Errormsg";
import { CalendarIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PrivatePostsList({ posts, loading, error }) {
  return (
    <div className="bg-slate-950 min-h-screen">
      <section className="py-16">
        <div className="container px-4 mx-auto">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full uppercase">
              Member Exclusive Content
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Curated{" "}
              <span className="text-indigo-400">Developer Insights</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
              Explore deep-dives and technical strategies shared by our private
              community of engineers.
            </p>
          </div>

          {/* Posts Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <LoadingComponent />
              </div>
            ) : error ? (
              <div className="col-span-full p-8 bg-red-900/20 border border-red-800/50 rounded-2xl">
                <Errormsg message={error?.message} />
              </div>
            ) : posts?.length <= 0 ? (
              <div className="col-span-full text-center py-20 bg-slate-900/50 border border-slate-800 rounded-3xl">
                <h2 className="text-slate-500 text-xl font-medium">
                  No specialized posts found in your feed.
                </h2>
              </div>
            ) : (
              posts?.map((post) => (
                <article
                  key={post._id}
                  className="group bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                >
                  {/* Post Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={post?.image}
                      alt={post?.title}
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-lg uppercase tracking-wider">
                        {post?.category?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                  </div>

                  {/* Post Content */}
                  <div className="p-8">
                    {/* Date with Icon */}
                    <div className="flex items-center text-slate-500 text-xs font-bold mb-4 uppercase tracking-widest">
                      <CalendarIcon className="h-4 w-4 mr-2 text-indigo-500" />
                      {new Date(post?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
                      {post?.title}
                    </h2>

                    {/* Preview */}
                    <p className="text-slate-400 mb-8 line-clamp-3 text-sm leading-relaxed font-medium">
                      {post?.content}
                    </p>

                    {/* Action Button */}
                    <Link
                      to={`/posts/${post._id}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 group/btn"
                    >
                      <span>Read Full Deep-Dive</span>
                      <ArrowRightIcon className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
