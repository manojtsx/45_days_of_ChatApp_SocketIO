import { useEffect, useState } from "react";
import api from "@/api/api";
import { chatState } from "@/context/ChatProvider";
import { UserInterface } from "@/interfaces/form-control";
import { toast } from "react-toastify";
import { SearchUserDrawerProps } from "@/interfaces/drawer-interface";
import ChatLoading from "./mini-component/ChatLoading";

function SearchUserDrawer({ open, onClose }: SearchUserDrawerProps) {
  const { user, setSelectedChat, chats, setChats } = chatState()!;
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    // Fetch all users
    async function fetchUsers() {
      if (open) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        };
        setLoading(true);
        try {
          const { data } = await api.get("/api/user/", config);
          setUsers(data);
        } catch (error) {
          toast.error("Failed to fetch users");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchUsers();
  }, [open]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    setFilteredUsers(
      users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await api.post("/api/chat/", { userId }, config);
      if (!chats.includes(data._id)) {
        setChats([...chats, data._id]);
      }
      setSelectedChat(data);
      onClose();
    } catch (err) {
      toast.error("Failed to access chat");
    } finally {
      setLoadingChat(false);
    }
  };
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-white shadow-lg w-80 p-6`}
    >
      <button
        onClick={onClose}
        className="mb-4 text-gray-500 hover:text-gray-700"
      >
        Close
      </button>
      <h2 className="text-lg font-semibold text-gray-800">Search User</h2>
      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          placeholder="Search User"
          value={search}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Go
        </button>
      </div>
      {loading ? (
        <ChatLoading />
      ) : (
        <div className="mt-4 space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border-b border-gray-200"
            >
              <img
                src={user.pic}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-800 truncate">
                  {user.name}
                </h4>
                <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-extrabold">Email: </span>
                  {user.email}
                </p>
              </div>
              <button
                className="px-3 py-1 ml-4 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => accessChat(user._id as string)}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchUserDrawer;
