import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deletePostAction,
  getPostAction,
  viewsPostAction,
} from "../../redux/slices/posts/postSlices";
import Errormsg from "../alert/Errormsg";
import PostStats from "./PostStats";
import calculateReadingTime from "../../utils/CalculateReadingTime";
import AddComment from "../comment/AddComment";
import {
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, error } = useSelector((state) => state.posts);
  const { profile, userAuth } = useSelector((state) => state.users);

  const currentUserId = userAuth?.userInfo?.Id?.toString();
  const postAuthorId = post?.post?.author?._id?.toString();
  const isCreater = currentUserId === postAuthorId;

  const handlerDelete = () => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      dispatch(deletePostAction(id));
      navigate("/posts");
    }
  };

  const handlerUpdate = () => {
    navigate(`/posts/${id}/update`);
  };

  useEffect(() => {
    dispatch(getPostAction(id));
  }, [
    dispatch,
    id,
    post?.post?.likes?.length,
    post?.post?.disLikes?.length,
    post?.post?.claps,
  ]);

  useEffect(() => {
    dispatch(viewsPostAction(id));
  }, [dispatch, id]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      {error ? (
        <div className="max-w-4xl mx-auto pt-20 px-4">
          <Errormsg message={error?.message} />
        </div>
      ) : (
        <article className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/5 blur-[120px] -z-10"></div>

          <div className="container px-4 mx-auto">
            {/* Header / Meta Section */}
            <div className="mx-auto mb-12 text-center max-w-4xl">
              <span className="inline-flex items-center px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full uppercase">
                {post?.post?.category?.name || "Tech Story"}
              </span>

              <h1 className="mb-8 text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter text-white">
                {post?.post?.title}
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 border-y border-slate-800 py-6">
                {/* Author Profile */}
                <Link
                  to={`/users-public-profile/${post?.post?.author?._id}`}
                  className="flex items-center gap-3 group transition-all"
                >
                  <img
                    className="w-12 h-12 rounded-full ring-2 ring-indigo-500/20 group-hover:ring-indigo-500 transition-all object-cover"
                    src={
                      post?.post?.author?.profilePicture ||
                      profile?.userdata?.profilePicture
                    }
                    alt={post?.post?.author?.username}
                  />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white group-hover:text-indigo-400">
                      {post?.post?.author?.username}
                    </p>
                    <p className="text-xs text-slate-500">Author</p>
                  </div>
                </Link>

                <div className="hidden md:block h-8 w-px bg-slate-800"></div>

                {/* Date */}
                <div className="flex items-center text-slate-400 gap-2 text-sm font-medium">
                  <CalendarIcon className="h-5 w-5 text-indigo-500" />
                  {new Date(post?.post?.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto mb-16 px-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                <img
                  className="w-full h-auto max-h-[600px] object-cover"
                  src={post?.post?.image}
                  alt="featured"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-3xl mx-auto mb-16 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-2">
              <PostStats
                views={post?.post?.postsViews?.length}
                likes={post?.post?.likes?.length}
                dislikes={post?.post?.disLikes?.length}
                comments={post?.post?.comments?.length}
                createdAt={post?.post?.createdAt}
                readingTime={calculateReadingTime(post?.post?.content)}
                postID={post?.post?._id}
                claps={post?.post?.claps}
              />
            </div>

            {/* Main Content Body */}
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-invert prose-indigo max-w-none mb-16 text-slate-300 leading-relaxed text-lg">
                <p className="whitespace-pre-line">{post?.post?.content}</p>
              </div>

              {/* Author Actions (Fixed at bottom of content) */}
              {isCreater && (
                <div className="flex items-center justify-end gap-4 border-t border-slate-800 pt-8 mb-16">
                  <span className="text-sm font-medium text-slate-500">
                    Story Settings:
                  </span>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-xl transition-all font-bold text-sm border border-slate-700"
                    onClick={handlerUpdate}
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                    Edit Story
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-600 text-white rounded-xl transition-all font-bold text-sm border border-slate-700"
                    onClick={handlerDelete}
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </button>
                </div>
              )}

              {/* Comments Section */}
              <div className="bg-slate-900/30 rounded-3xl border border-slate-800 p-8 md:p-12">
                <h3 className="mb-8 text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-indigo-500 rounded-full"></span>
                  Discussion
                </h3>
                <AddComment Id={id} comments={post?.post?.comments} />
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
