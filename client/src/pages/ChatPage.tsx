import { useEffect, useState } from "react";
import axios from "axios";
import { ChatInterface } from "@/interfaces/chat-interface";

const API = import.meta.env.VITE_BACKEND_URL;

function ChatPage() {
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const fetchAllChats = async () => {
    const { data } = await axios.get(`${API}/api/chat`);
    console.log(data);
    setChats(data);
  };
  useEffect(() => {
    fetchAllChats();
  }, []);
  return (
    <div>
      {chats.map((chat) => {
        return <div key={chat._id}>{chat.chatName}</div>;
      })}
    </div>
  );
}

export default ChatPage;
