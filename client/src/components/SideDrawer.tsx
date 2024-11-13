import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "./mini-component/Avatar";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <div
        title="Search Users to Chat"
        className="flex items-center space-x-2 cursor-pointer"
      >
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 focus:outline-none">
          <SearchIcon />
          <p className="text-sm font-medium">Search User</p>
        </button>
      </div>

      <p title="title" className="text-lg font-semibold text-gray-800">
        Talk-A-Tive
      </p>

      <div className="flex cursor-pointer hover:text-blue-500 justify-center items-center gap-4">
        <NotificationsIcon className="text-2xl" />
        <Avatar />
      </div>
    </div>
  );
}

export default SideDrawer;
