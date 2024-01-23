import SearchBox from "./SearchBox.js";

function StatusBar() {
  return (
    <div className="flex flex-row w-full top-[0px] left-[15px] absolute ">
      <SearchBox />
    </div>
  );
}

export default StatusBar;