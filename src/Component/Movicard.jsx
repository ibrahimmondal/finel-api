import React from "react";
import { Link } from "react-router";

function Movicard({ item }) {
  const { original_title, overview, poster_path, vote_average, id } = item;

  const MOVIES_IMG = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  return (
    <Link to={`/movie/${id}`} className="group relative bg-black mb-5 px-4 h-[500px]">
      <img
        alt=""
        src={MOVIES_IMG}
        className="absolute inset-0 w-full h-full object-bottom object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4">
        <p className="text-sm font-medium uppercase text-pink-500">
          {vote_average.toFixed(1)}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl">
          {original_title}
        </p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white w-[300px]">
              {overview.slice(0, 150)}....
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Movicard;
