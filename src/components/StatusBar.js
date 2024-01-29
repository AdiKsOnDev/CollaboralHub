import SearchBox from "./SearchBox.js";
import ProfilePicture from "./ProfilePicture.js";

function StatusBar() {
  return (
    <div className="flex flex-row justify-between items-center px-5 w-full">
      <SearchBox />
      <ProfilePicture />
    </div>
  );
}

export default StatusBar;
