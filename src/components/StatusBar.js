import SearchBox from "./SearchBox.js";
import ProfilePicture from "./ProfilePicture.js"

function StatusBar() {
  return (
    <div data-testid="statusbar" className="flex flex-row justify-between items-center px-10 w-full">
      <SearchBox />
      <ProfilePicture/>
    </div>
  );
}

export default StatusBar;
