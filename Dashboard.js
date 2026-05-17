import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      {/* Welcome Section */}
      <h1 className="text-3xl font-bold mb-4">Welcome, [User Name]!</h1>
      <p className="mb-6 text-gray-700">
        Your AI-Driven Smart Portfolio Dashboard
      </p>

      {/* Portfolio Completion */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Portfolio Completion</h2>
        <div className="w-full bg-gray-300 rounded-full h-4">
          <div className="bg-blue-500 h-4 rounded-full w-70"></div> {/* dynamic width later */}
        </div>
        <span className="text-sm text-gray-600 mt-1 block">70% Complete</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Portfolio
        </button>
        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
          Preview Portfolio
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Generate Shareable Link
        </button>
      </div>
    </div>
  );
}

export default Dashboard;