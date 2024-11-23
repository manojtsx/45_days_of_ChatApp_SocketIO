import { chatState } from "@/context/ChatProvider";
function ProfileModal({ onClose }: { onClose: () => void }) {
  const { user } = chatState()!;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg relative gap-2">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-80 max-w-full text-center">
          <img
            src={user && user.pic ? user.pic : ""}
            alt="User Profile Picture"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
          <h3 className="text-xl flex justify-center font-semibold text-gray-800">
            {user && user.name}
          </h3>
          <p className="text-gray-600">{user && user.email}</p>
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
