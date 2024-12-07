import React, { useEffect, useState } from "react";
import Movicard from "./Movicard"
import Loader from "./Loader"

export default function App() {
  const API = `https://api.themoviedb.org/3/search/movie?query=`;
  const API_key = "&api_key=4118874897d8c40a6a13be2a3bb5bb03";

  const [search, setSearch] = useState("batman");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}${search}${API_key}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Something went wrong with fetchimg movies 🤣🤣");
        }
        const data = await response.json();
        setMovies(data.results.slice(0, 9));
        console.log(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (search.length >= 3) {
      setError("");
      searchMovies();
    }
    return function () {
      controller.abort();
    };
  }, [search]);

  // const searchHandle = (puery, e) => {
  //   // e.preventDefault();
  //   searchMovies(puery)
  // };
  return (
    <>
      <header className="bg-black py-[9rem]">
        <h1 className="text-white text-center py-3 text-2xl font-semibold">
          Search For Movie
        </h1>
        <div className="max-w-[700px] mx-auto relative px-4">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="Search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm pl-2 pr-8"
          />

          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 mr-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
      </header>
      <section className="max-w-[1200px] mx-auto mt-10">
        {isLoading && <Loader/>}
        {!isLoading && !error && movies.length !== 0 && (
          <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-3 lg:grid-cols-3">
            {movies.map((item) => (
              <Movicard key={item.id} item={item} />
            ))}
          </div>
        )}
        {error && <p className="text-2xl text-center">{error}</p>}
      </section>
    </>
  );
}


