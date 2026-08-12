import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100svh-72px)] flex items-center justify-center py-16">
      <div className="w-full max-w-4xl text-center">
        <h1 className="font-geist-pixel text-[clamp(2rem,10vw,4rem)] leading-[1] text-black dark:text-white">
          404
        </h1>
        <p className="mt-4 text-lg text-black/65 dark:text-white/65">
          We couldn't find that page.
        </p>
        <p className="mt-2 text-sm text-black/50 dark:text-white/50">
          Try returning to the homepage or check the URL.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded border border-black/20 px-4 py-2 text-[13px] font-medium transition hover:bg-black/[0.03] dark:border-white/20 dark:hover:bg-white/[0.03]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
