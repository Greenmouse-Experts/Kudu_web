import { useState } from "react";
import { Menu, MenuHandler, MenuList } from "@material-tailwind/react";


const SearchBar = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("FILTER");

  const filters = ["All", "Name", "Category", "Price"];

  return (
    <div className="flex items-center w-full md:max-w-sm lg:max-w-md rounded-full overflow-hidden bg-[#FFF2EA] relative">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search item"
        className="flex-1 xl:py-4 xl:px-5 md:py-3 md:px-4 sm:py-2 text-sm text-black bg-[#FFF2EA] outline-none"
      />

      {/* Filter Button & Dropdown */}
      <div className="relative z-50">
        <Menu>
          <MenuHandler>
            <button
              className="bg-white border-gray-300 px-4 mr-4 py-1 text-xs font-fold rounded-full flex items-center gap-1"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              {selectedFilter}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>
          </MenuHandler>
          <MenuList>
            {/* Dropdown Menu */}
            <div className="w-48" style={{ zIndex: "9999 !important" }}>
              {filters.map((filter, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-gray-200 z-50"
                  onClick={() => {
                    setSelectedFilter(filter);
                    setFilterOpen(false);
                  }}
                  style={{ zIndex: "9999 !important" }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </MenuList>
        </Menu>
      </div>

      {/* Search Button */}
      <button className="bg-kuduOrange text-white xl:py-4 xl:px-5 md:py-3 md:px-4 sm:py-2 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path d="M10 2a8 8 0 105.293 13.707l4.998 4.998a1 1 0 101.414-1.414l-4.998-4.998A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
