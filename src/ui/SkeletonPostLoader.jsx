function SkeletonPostLoader() {
  return (
    <div className="animate-pulse p-4 border border-gray-700 rounded-sm shadow-sm bg-gray-800 w-full mb-5">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-500 rounded"></div>
          <div className="h-3 w-20 bg-gray-400 rounded"></div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="h-4 w-full bg-gray-500 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-500 rounded"></div>
      </div>

      <div className="mt-4 h-32 w-full bg-gray-500 rounded-xl"></div>

      <div className="flex space-x-6 mt-4">
        <div className="h-4 w-16 bg-gray-500 rounded"></div>
        <div className="h-4 w-16 bg-gray-500 rounded"></div>
        <div className="h-4 w-16 bg-gray-500 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonPostLoader;
