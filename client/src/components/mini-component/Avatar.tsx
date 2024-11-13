import { useState } from "react";
import { chatState } from "@/context/ChatProvider";
import ProfileModel from "./ProfileModel";

function Avatar() {
  const { user } = chatState()!;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Avatar button */}
      <button className="focus:outline-none flex" onClick={toggleMenu}>
        {user && user.pic ? (
          <img
            src={user.pic}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
            <span className="text-sm font-semibold">A</span>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                closeMenu();
                setOpenProfileModal(true);
              }}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={closeMenu}
            >
              Settings
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
              onClick={closeMenu}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      {/* Profile Modal */}
      {openProfileModal && <ProfileModel onClose={()=>setOpenProfileModal(false)}/>}
    </div>
  );
}

export default Avatar;
