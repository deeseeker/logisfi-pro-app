import React from "react";

const ShimmerTabs = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Tabs List */}
      <div className="flex space-x-4">
        <div className="h-8 w-32 bg-gray-200 rounded"></div>
        <div className="h-8 w-32 bg-gray-200 rounded opacity-50"></div>
      </div>

      {/* Overview Content */}
      <div className="space-y-8">
        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 rounded-lg"
              style={{
                background: `linear-gradient(99.61deg, #e5e7eb 2.12%, #f3f4f6 100%)`,
              }}
            ></div>
          ))}
        </div>

        {/* Graph and Recent Investments */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <div className="col-span-4 h-64 bg-gray-200 rounded-lg"></div>
          <div className="col-span-4 md:col-span-3">
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded w-full"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerTabs;
