import { UserInterface } from "./form-control";
export interface ChatInterface{
    _id : string;
    chatName : string;
    users : UserInterface[];
    name: string;
    email : string;
    isGroupChat : boolean;
}

export interface ChatContextType{
    user: UserInterface | null;
    setUser : (user : UserInterface) => void;
    selectedChat : ChatInterface | null;
    setSelectedChat : (chat : ChatInterface | null) => void;
    chats : ChatInterface[];
    setChats : (chats : ChatInterface[]) => void;
}