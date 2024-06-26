import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { database } from "../firebase";
// import { collection } from "firebase/firestore";

import { ReactComponent as SearchSVG } from "../Assets/Magnifier.svg";

const SearchBox = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    // const projectsRef = collection(database, "Projects");
    // const querySnapshot = await getDocs(projectsRef);
    // const allProjects = querySnapshot.docs.map((doc) => doc.data());

    // Perform the fuzzy search
    // const searchResults = fuse.search(searchQuery);

    // Extract the matched documents
    
    navigate("/Dashboard?query=" + searchQuery);
  };

  return (
    <div className="container w-2/4 p-4 flex flex-col justify-center items-center">
      <div className="flex w-full">
        <input
          type="text"
          placeholder="Search For Projects"
          value={searchQuery}
          className="w-full h-14 px-4 py-2 border rounded-l-md focus:outline-none text-xl font-semibold"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 h-14 text-text-color bg-accent-red font-semibold rounded-r-md focus:outline-none text-xl hover:bg-accent-blue duration-300"
          onClick={handleSearch}
        >
          <SearchSVG className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
