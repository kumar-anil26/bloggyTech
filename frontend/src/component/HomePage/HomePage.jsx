import React from "react";
import Register from "../Users/Register";
import PublicPosts from "../posts/PublicPosts";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Homepage = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-28 md:pt-20 md:pb-32 before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-[1000px] before:h-[1000px] before:bg-gradient-to-b before:from-indigo-950/50 before:to-transparent before:rounded-full before:blur-3xl before:-z-10">
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-wrap items-center -mx-4">
            {/* Left Column: Content (45% Width) */}
            <div className="w-full lg:w-[45%] px-4 mb-16 lg:mb-0">
              <div className="max-w-xl">
                <span className="inline-flex items-center rounded-full bg-indigo-950 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-300 uppercase ring-1 ring-inset ring-indigo-800 mb-6">
                  Developer Community
                </span>

                <h1 className="mb-6 text-4xl md:text-5xl xl:text-6xl leading-tight text-white font-extrabold tracking-tighter">
                  Where the Tech World{" "}
                  <span className="text-indigo-400">Shares its Logic.</span>
                </h1>

                <p className="mb-10 text-xl leading-relaxed text-slate-400 font-medium">
                  Stay ahead of the curve. Dive into technical deep-dives,
                  architectural best practices, and innovative posts from
                  engineers worldwide.
                </p>

                <ul className="space-y-5">
                  {[
                    "Access verified, engineering Tech Posts.",
                    "Engage directly with authors through thread comments.",
                    "Bookmark and organize key technical concepts.",
                    "Contribute your own logic and grow your reputation.",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="mr-3.5 h-7 w-7 text-indigo-500 flex-shrink-0" />
                      <p className="text-lg text-slate-300 font-medium pt-0.5">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Register Form (55% Width) */}
            <div className="w-full lg:w-[55%] px-4">
              <div className="relative flex justify-center lg:justify-end">
                {/* Glow behind the form */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-10 blur-3xl -z-10"></div>
                <Register />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="bg-slate-900 border-t border-slate-800 py-20 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Explore the{" "}
              <span className="text-indigo-400">Latest Stories</span>
            </h2>
            <p className="text-lg text-slate-400">
              Fresh insights, Posts, and discussions deployed from the
              BloggyTech community.
            </p>
          </div>
          <PublicPosts />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
