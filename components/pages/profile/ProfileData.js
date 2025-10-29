"use client";

import { useState } from "react";

export function ProfileData({ tab, userDetails }) {
  const [activeTab, setActiveTab] = useState(tab || "info");

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === "info"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Profile Information
          </button>
        </nav>
      </div>

      {activeTab === "info" && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                {userDetails?.firstName || "N/A"}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                {userDetails?.lastName || "N/A"}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                {userDetails?.email || "N/A"}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                {userDetails?.dateOfBirth || "N/A"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
