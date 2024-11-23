import api from "@/api/api";
import { chatState } from "@/context/ChatProvider";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { ChatInterface } from "@/interfaces/chat-interface";
import GroupChatModel from "./mini-component/GroupChatModel";

function MyChats() {
  const { selectedChat, setSelectedChat, user, chats, setChats } = chatState()!;
  const [loggedUser, setLoggedUser] = useState<any>(()=>{JSON.parse(localStorage.getItem("userInfo") as string) || null});
  const [filteredChats, setFilteredChats] = useState<ChatInterface[]>([]);
  const [search, setSearch] = useState("");
  const [groupChatModelOpen, setGroupChatModelOpen] = useState(false);
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await api.get("/api/chat/", config);
      setChats(data);
    } catch (error:Error | any) {
      toast.error(error.message || "Failed to fetch chats");
    }
  };

  const filterChats = () => {
    if (search.trim() === "") {
      setFilteredChats(chats);
    } else {
      setFilteredChats(
        chats.filter((chat) => {
          if (chat.isGroupChat) {
            console.log(chat.chatName);
            return chat.chatName?.includes(search);
          }
          return chat.users[1].name?.includes(search);
        })
      );
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") as string));
    fetchChats();
    console.log("Rendered")
  }, []);

  useEffect(() => {
    filterChats();
  }, [chats]);

  const handleChatSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleSearch = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    filterChats();
  };

  const handleAddChat = (newChat: ChatInterface) => {
    setChats([...chats, newChat]);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar for Chats */}
      <div className="bg-gray-100 p-4 overflow-y-auto max-h-screen">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md space-y-6 mb-5">
          <h3 className="text-center text-2xl font-extrabold text-gray-900">
            My Chats
          </h3>
          {groupChatModelOpen ? (
            <GroupChatModel onClose={() => setGroupChatModelOpen(false)} onAddChat={handleAddChat} />
          ) : null}
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-medium rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            onClick={() => setGroupChatModelOpen(true)}
          >
            <AddIcon className="w-6 h-6" />
            New Group Chat
          </button>
        </div>

        <div className="flex items-center mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search chats"
            name="name"
            value={search}
            onChange={handleChatSearchChange}
            className="flex-1 px-4 py-2 text-sm text-gray-700 border-none outline-none"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all"
            onClick={handleSearch}
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Chat List */}
        <div className="overflow-y-auto max-h-[calc(100vh-240px)]">
          {filteredChats.map((chat) =>
            chat.isGroupChat ? (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-3 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  selectedChat === chat ? "bg-blue-100" : "bg-white"
                }`}
              >
                {chat.users[1] ? (
                  <img
                    src={chat.users[1].pic}
                    alt={chat.chatName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <img
                    src={chat.users[0].pic}
                    alt={chat.chatName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {chat.chatName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {chat.users[1]?.email}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`flex items-center p-3 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  selectedChat === chat ? "bg-blue-100" : "bg-white"
                }`}
              >
                {chat.users[1] ? (
                  <img
                    src={chat.users[1].pic}
                    alt={chat.users[1].name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <img
                    src={chat.users[0].pic}
                    alt={chat.users[0].name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {chat.users[1]?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {chat.users[1]?.email}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default MyChats;
