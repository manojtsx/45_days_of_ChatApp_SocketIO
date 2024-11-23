import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { ChatContextType, ChatInterface } from "@/interfaces/chat-interface";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "@/interfaces/form-control";

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface | null>(null );
  const [selectedChat, setSelectedChat] = useState<ChatInterface | null>(null);
  const [chats, setChats] = useState<ChatInterface[]>([]);

  useEffect(() => {
    const LSData : string | null = localStorage.getItem("userInfo");
    if (LSData) {
      try {
        const userInfo: UserInterface = JSON.parse(LSData);
        setUser(userInfo); // Set valid user data
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
        setUser(null); // Fallback to null if parsing fails
      }
    } else {
      setUser(null); // Clear user if no data in localStorage
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if no user
    }
  }, [user, navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};
