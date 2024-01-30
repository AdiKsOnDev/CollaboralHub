import React, { useState } from "react";
import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

import { ReactComponent as SearchSVG } from "../Assets/Magnifier.svg";

const SearchBox = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const projectsRef = collection(database, "Projects");
    const querySnapshot = await getDocs(projectsRef);
    const allProjects = querySnapshot.docs.map((doc) => doc.data());

    // Perform the fuzzy search
    // const searchResults = fuse.search(searchQuery);

    // Extract the matched documents
    const results = searchResults.map((result) => result.item);

    setSearchResults(results);
  };

  return (
    <div className="container w-2/4 mx-auto p-4 flex flex-col justify-center items-center">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Search For Sticky Notes"
          value={searchQuery}
          className="w-full h-14 px-4 py-2 border rounded-md focus:outline-none text-xl font-semibold"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 h-14 text-text-color bg-accent-red font-semibold ml-3 rounded-md focus:outline-none text-xl hover:bg-dark-red duration-300"
          onClick={handleSearch}
        >
          <SearchSVG className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;