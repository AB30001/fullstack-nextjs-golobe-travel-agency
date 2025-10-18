"use client";

import { Share2, Heart } from "lucide-react";
import { useState } from "react";

export function ShareSaveButtons() {
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>
      <button
        onClick={() => setIsSaved(!isSaved)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${
          isSaved
            ? "border-red-500 bg-red-50 text-red-600"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        Save
      </button>
    </div>
  );
}
