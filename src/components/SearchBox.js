import React, { useState } from "react";
import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

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

    <div className="w-[1007px] h-[69px] left-[380px] top-[30px] absolute">
            
    <div class="w-[525px] h-[61px] left-0 top-[8px] absolute ">
        <input
            type="text"
            placeholder="Search here . . ."
            value={searchQuery}
            className="w-full px-4 py-2 border text-gray-800 font-poppins text-sm font-semibold leading-normal tracking-wider rounded-full bg-zinc-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            />
    </div>

        <button className="left-[530px] top-[10px] absolute bg-rose-600 rounded-[10px] text-white bg-accent-red hover:bg-dark-red focus:ring-4 focus:outline-none focus:ring-red-300 font-medium font-semibold rounded-full text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleSearch}> Search </button>

    </div>
    );
    };

export default SearchBox;
