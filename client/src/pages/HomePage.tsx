import BasicTabs from "../mui-component/BasicTabs";

function HomePage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          ChatApp
        </h1>
        <BasicTabs />
      </div>
    </div>
  );
}

export default HomePage;
