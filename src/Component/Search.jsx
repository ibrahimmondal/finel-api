import React from 'react'

export default function Search() {
  return (
    <header className='bg-black py-[9rem] w-full'>
<h1 className='text-white text-center py-3 text-2xl font-semibold'>Search For Movie</h1>
<div className="w-[700px] mx-auto relative">
  <label htmlFor="Search" className="sr-only"> {" "}Search {" "}</label>
  
  <form>
  <input
    type="text"
    id="Search"
    onChange={(e) => setSearch(e.target.value)
    }
    placeholder="Search for movie"
    className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm p-2"
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
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </span>
  </form>
</div>
</header>
  )
}
