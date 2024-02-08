import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handelSubmit(e) {
    e.preventDefault();
    if (query == "") return;
    navigate(`order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handelSubmit}>
      <input
        type="text"
        name="searchOrder"
        id="orderSearch"
        placeholder="Search Order By Id #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-[width_color_background-color_border-color] duration-300 placeholder:text-stone-400 focus:w-32 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
