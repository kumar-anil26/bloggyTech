import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Homepage from "./component/HomePage/HomePage";
import Login from "./component/Users/Login";
import PublicNavbar from "./component/NavBar/PublicNavbar";
import PrivateNavbar from "./component/NavBar/PrivateNavbar";
import ProtectedRout from "./component/AuthRout/ProtectedRout";
import PublicPosts from "./component/posts/PublicPosts";
import Register from "./component/Users/Register";
import AddPost from "./component/posts/AddPost";
import PostDetails from "./component/posts/PostDetails";
import PostsList from "./component/posts/PostsList";
import UpdatePost from "./component/posts/UpdatePost";
import PublicUserProfile from "./component/Users/PublicUserProfile";
import PrivateUserProfile from "./component/Users/PrivateUserProfile";
import ForgotPassword from "./component/Users/ForgotPassword";
import ResetPassword from "./component/Users/ResetPassword";

export default function App() {
  // Pulling userAuth from Redux
  const { userAuth } = useSelector((state) => state.users);
  const isLoggedIn = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {/* 1. Dynamic Navbar */}
      {isLoggedIn ? <PrivateNavbar /> : <PublicNavbar />}

      {/* 2. Styled Main Wrapper for BloggyTech Look */}
      <main className="min-h-screen bg-slate-900 border-b border-slate-800">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-50/50 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!isLoggedIn ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/public-posts" element={<PublicPosts />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:resetToken"
              element={<ResetPassword />}
            />

            {/* Protected Routes */}
            <Route
              path="/users-public-profile/:userId"
              element={
                <ProtectedRout>
                  <PublicUserProfile />
                </ProtectedRout>
              }
            />
            <Route
              path="/users-private-profile/:userId"
              element={
                <ProtectedRout>
                  <PrivateUserProfile />
                </ProtectedRout>
              }
            />
            <Route
              path="/add-post"
              element={
                <ProtectedRout>
                  <AddPost />
                </ProtectedRout>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <ProtectedRout>
                  <PostDetails />
                </ProtectedRout>
              }
            />
            <Route
              path="/posts"
              element={
                <ProtectedRout>
                  <PostsList />
                </ProtectedRout>
              }
            />
            <Route
              path="/posts/:id/update"
              element={
                <ProtectedRout>
                  <UpdatePost />
                </ProtectedRout>
              }
            />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}