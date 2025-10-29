"use client";

import Image from "next/image";

export function ProfileImages({ avatar, cover, name, email }) {
  return (
    <div className="mb-8">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-600">
        {cover && (
          <Image
            src={cover}
            alt="Cover"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="relative -mt-16 px-6">
        <div className="flex items-end gap-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
            {avatar ? (
              <Image
                src={avatar}
                alt={name || "Profile"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-600 text-3xl font-bold text-white">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="mb-4 flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{name || "User"}</h1>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
