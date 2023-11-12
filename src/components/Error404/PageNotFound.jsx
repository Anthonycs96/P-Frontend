import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function PageNotFound() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#262837]">
      <div className="text-center">
        <p className="text-5xl text-red-500 font-bold mb-4">¡Oops! 404</p>
        <p className="text-lg text-gray-200 mb-4">
          Parece que te has perdido en el ciberespacio.
        </p>
        <p className="text-lg text-gray-100 mb-4">
          {error.statusText || error.message}
        </p>
        <p className="text-lg text-gray-100 mb-4">
          ¡No te preocupes, incluso los astronautas se pierden a veces!
        </p>
        <Link to="/Mesas" className="inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          <span className="text-lg text-gray-100 underline">
            Vuelve a casa astronauta
          </span>
        </Link>
      </div>
    </div>
  );
}
