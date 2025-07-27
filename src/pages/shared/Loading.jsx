// components/Loading.jsx
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
        <p className="text-red-600 font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
