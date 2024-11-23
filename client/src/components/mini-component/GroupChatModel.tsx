import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import api from "@/api/api";
import { toast } from "react-toastify";
import { chatState } from "@/context/ChatProvider";
import { ChatInterface } from "@/interfaces/chat-interface";

function GroupChatModel({ onClose, onAddChat }: { onClose: () => void , onAddChat: (newChat : ChatInterface) => void }) {
  const {user} = chatState()!;
  const [groupName, setGroupName] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  // Handle user search
  const handleSearch = async (searchText: string) => {
    setUserSearch(searchText);
    if (searchText.trim() === "") {
      setSuggestedUsers([]);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await api.get(`/api/user?search=${searchText}`, config);
      setSuggestedUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // Add selected user
  const handleUserSelect = (user: any) => {
    if (!selectedUsers.find((u) => u._id === user._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setUserSearch("");
    setSuggestedUsers([]);
  };

  // Remove selected user
  const handleUserRemove = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || selectedUsers.length === 0) {
      toast.error("Group name and users are required");
      return;
    }
    // API call to create group can go here
    try{

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
      const reqData = {
        name: groupName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      }
      console.log(reqData);
      const { data } = await api.post("/api/chat/group", reqData, config);
      onAddChat(data);
      toast.success("Group created successfully");
      onClose();
    }catch(error : any){
      toast.error(error.message || "Failed to create group");
    } 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <div className="mb-4">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <label
          htmlFor="group-name"
          className="block text-sm font-medium text-gray-700"
        >
          Group Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="group-name"
            id="group-name"
            autoComplete="group-name"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
      <div className="mb-4 relative">
        <label
          htmlFor="add-user"
          className="block text-sm font-medium text-gray-700"
        >
          Add User
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="add-user"
            id="add-user"
            autoComplete="off"
            placeholder="Enter username or email"
            value={userSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          />
          {/* Suggestions Dropdown */}
          {suggestedUsers.length > 0 && (
            <ul className="absolute z-10 w-full bg-white shadow-md max-h-40 overflow-y-auto border border-gray-300 rounded-md mt-1">
              {suggestedUsers.map((user) => (
                <li
                  key={user._id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Selected Users
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedUsers.map((user) => (
            <span
              key={user._id}
              className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium"
            >
              {user.name}
              <button
                type="button"
                onClick={() => handleUserRemove(user._id)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Create Group
      </button>
    </form>
  );
}

export default GroupChatModel;
