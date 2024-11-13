import { UserInterface } from "./form-control";
export interface ChatInterface{
    _id : string;
    chatName : string;
}

export interface ChatContextType{
    user: UserInterface;
    setUser : (user : UserInterface) => void;
}