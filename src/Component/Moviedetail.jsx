import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function Moviedetail() {
  const API = `https://api.themoviedb.org/3/movie/`;
  const API_key = "?api_key=4118874897d8c40a6a13be2a3bb5bb03";

  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}${id}${API_key}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Something went wrong with fetchimg movies 🤣🤣");
        }
        const data = await response.json();
        setMovies(data);
        console.log(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
    return function () {
      controller.abort();
    };
  }, [id]);

  const formatBudget = (budget) => {
    if (!budget) return "N/A";
    return `$${budget.toLocaleString()}`;
  };

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const {
    original_title,
    overview,
    poster_path,
    vote_average,
    release_date,
    backdrop_path,
    budget,
    popularity,
    runtime,
    tagline,
  } = movies;

  const MOVIES_IMG = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const backdrop_img = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
  // const bg = {backdrop_path} ;
  return (
    <section>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <div>
          <div
            class="bg-blue-50 min-h-screen flex items-center justify-center px-4"
            style={{
              backgroundImage: `url(${backdrop_img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div class="max-w-[1200px] mx-auto flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              {/* <!-- Left: Poster Image --> */}
              <div class="w-full md:w-1/3">
                <img
                  src={MOVIES_IMG}
                  alt={`${original_title || "Movie Poster"}`}
                  class="object-cover h-full w-full"
                />
              </div>

              {/* <!-- Right: Content Section --> */}
              <div class="w-full md:w-2/3 p-6">
                {/* <!-- Title and Metadata --> */}
                <h1 class="text-2xl font-bold text-gray-800">
                  {original_title}
                  <span class="text-gray-500">
                    {" "}
                    ({release_date ? release_date.split("-")[0] : "N/A"})
                  </span>
                </h1>
                <p class="mt-2 text-sm text-gray-600">
                  Release Date: {release_date}
                </p>

                {/* <!-- User Score --> */}
                <div class="flex items-start mt-4 flex-col md:flex md:flex-row gap-4 ">
                  <div class="flex items-center space-x-2">
                    <div class="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                      <h1>
                        {popularity ? `${Math.round(popularity)}%` : "N/A"}
                      </h1>
                    </div>
                    <span class="text-sm text-gray-400">
                      <span className="text-[20px] text-gray-500">
                        Budget:{" "}
                      </span>{" "}
                      {formatBudget(budget)}
                    </span>
                  </div>
                  <button class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded shadow ml-0">
                    What's your Vibe ?
                  </button>
                  <button class="flex items-center bg-gray-800 hover:bg-black text-white text-sm px-4 py-2 rounded shadow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.999v4.002a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    Play Trailer
                  </button>
                </div>
                <p className="pt-4 font-medium">
                  Tagline: <span className="font-normal">{tagline}</span>
                </p>
                {/* <!-- Overview --> */}
                <div class="mt-6">
                  <h2 class="text-lg font-semibold text-gray-800">Overview</h2>
                  <p class="mt-2 text-gray-600">{overview}</p>
                  <p class="mt-4 text-sm text-gray-500">
                    <span class="font-bold">Runtime : </span>
                    {formatRuntime(runtime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-2xl text-center">{error}</p>}
    </section>
  );
}
