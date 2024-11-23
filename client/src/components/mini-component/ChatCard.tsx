const ChatCard = ({ chat, isSelected, onSelect }: any) => {
  const chatUser = chat.users[1] || chat.users[0];
  return (
    <div
      onClick={() => onSelect(chat)}
      className={`flex items-center p-3 mb-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
        isSelected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <img
        src={chatUser.pic}
        alt={chatUser.name}
        className="w-12 h-12 rounded-full object-cover mr-4"
      />
      <div>
        <p className="text-sm font-medium text-gray-800">
          {chat.isGroupChat ? chat.chatName : chatUser.name}
        </p>
        <p className="text-xs text-gray-500">{chatUser.email}</p>
      </div>
    </div>
  );
};

export default ChatCard;
