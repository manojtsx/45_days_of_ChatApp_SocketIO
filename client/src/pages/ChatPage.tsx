import { chatState } from "@/context/ChatProvider";
import ChatBox from "@/components/ChatBox";
import MyChats from "@/components/MyChats";
import SideDrawer from "@/components/SideDrawer";
import { UserInterface } from "@/interfaces/form-control";

const API = import.meta.env.VITE_BACKEND_URL;

function ChatPage() {
  let user: UserInterface | undefined;
  if (chatState()) {
    user = chatState()?.user;
  }

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="flex justify-between">
        {user && <MyChats />}
        {user && <ChatBox />}
      </div>
    </div>
  );
}

export default ChatPage;
