import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { ChatContextType } from "@/interfaces/chat-interface";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "@/interfaces/form-control";

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface>({} as UserInterface);

  useEffect(() => {
    const LSData : string | null = localStorage.getItem("userInfo");
    if (LSData) {
      const userInfo = JSON.parse(LSData);
      console.log(userInfo);
      setUser(userInfo);

      if(!userInfo){
        navigate('/');
      }else{
        setUser(userInfo);
      }
    }
  },[navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const chatState = () => {
  return useContext(ChatContext);
};
