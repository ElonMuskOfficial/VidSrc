import { useState } from "react";
import data from "../../movie.json";
import { debounce } from "lodash";

const handleSearch = debounce((term, setSearchResults) => {
  if (term === "") {
    setSearchResults([]);
    return;
  }
  const results = data.filter((item) =>
    item.title.toLowerCase().includes(term.toLowerCase())
  );
  setSearchResults(results);
}, 300);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState(18);

  const handleChange = (e) => {
    const term = e.target.value.trim();
    console.log(term);
    setSearchTerm(term);
    handleSearch(term, setSearchResults);
  };

  const handleLoadMore = () => {
    // Increment the number of displayed results
    setDisplayedResults((prev) => prev + 10);
    const lastResult = document.querySelector(".search-result:last-child");
    if (lastResult) {
      lastResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <div className="container mx-auto max-w-5xl dark:bg-slate-900/40 h-screen">
      <div className="relative md:px-24 px-4 pt-5">
        <div className="text-3xl font-bold text-white/70 pb-2 uppercase text-center">Search movies by name.</div>
        <div className="group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 dark:text-slate-500"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            ></path>
          </svg>
          <input
            type="text"
            aria-label="Search..."
            placeholder="Search..."
            className="appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-10 ring-1 border-slate-100/5 ring-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-2"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>

        {searchResults.length > 0 && (
          <div className="dark:bg-slate-800 rounded-md mt-2 shadow overflow-hidden">
            <ul className="max-h-96 overflow-auto p-2 divide-y divide-slate-100/5">
              {searchResults.slice(0, displayedResults).map((result) => (
                <li
                  className="text-white search-result py-2 px-2 cursor-pointer hover:bg-slate-100/5 rounded-md"
                  key={result.tmdb_id}
                  onClick={() => window.open(result.embed_url, "_blank")}
                >
                  {result.title}
                </li>
              ))}
              {searchResults.length > displayedResults && (
                <button
                  onClick={handleLoadMore}
                  className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Load More
                </button>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
