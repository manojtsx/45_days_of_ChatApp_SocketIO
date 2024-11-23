import { UserInterface } from "./form-control";
export interface SearchUserDrawerProps {
  open: boolean;
  onClose: () => void;
}

export interface ChatContextType {
  user: UserInterface;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  selectedChat: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
  chats: string[];
}
