import SkeletonPostLoader from "./SkeletonPostLoader";

function SkeletonProfileLoader() {
  return (
    <div className="w-full animate-pulse">
      <div className="w-full h-[150px] sm:h-[250px] md:h-[400px] relative mb-[50px]">
        <div className="w-full h-[150px] sm:h-[250px] md:h-[400px] bg-gray-800 rounded-md"></div>

        <div className="absolute h-24 w-24 sm:h-30 sm:w-30 md:h-40 md:w-40 left-5 sm:left-10 bottom-0 translate-y-1/2">
          <div className="w-full h-full rounded-full bg-gray-600 border-[#364153] border-3"></div>
        </div>

        <div className="flex w-full justify-between">
          <div className="mt-5 ms-30 sm:ms-45 md:ms-55 flex flex-col w-full space-y-2">
            <div className="h-5 sm:h-6 w-40 sm:w-52 bg-gray-600 rounded"></div>
            <div className="flex items-center mt-2 space-x-2">
              <div className="h-4 w-24 sm:w-32 bg-gray-500 rounded"></div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-2 sm:mt-6 me-4 space-x-3">
            <div className="h-8 w-20 bg-gray-600 rounded"></div>
            <div className="h-8 w-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#626569] mt-25"></div>
      <div className="mt-15">
        <SkeletonPostLoader />
      </div>
    </div>
  );
}

export default SkeletonProfileLoader;
