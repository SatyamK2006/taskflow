import React from "react";

export default function TaskCard({
  title,
  desc,
  tintClass,
  accentLeft,
  onDelete,
  onMoveLeft,
  onMoveRight,
  canMoveLeft,
  canMoveRight,
}) {
  return (
    <div className={`${tintClass || "bg-white"} p-3 rounded-lg shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all animate-pop border-l-4 ${accentLeft || "border-l-gray-200"}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-medium leading-tight text-gray-900">{title}</p>
          {desc ? (
            <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <button
            title="Move left"
            onClick={onMoveLeft}
            disabled={!canMoveLeft}
            className="px-2 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
          >
            ←
          </button>
          <button
            title="Move right"
            onClick={onMoveRight}
            disabled={!canMoveRight}
            className="px-2 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
          >
            →
          </button>
          <button
            title="Delete"
            onClick={onDelete}
            className="px-2 py-1 rounded-md text-xs bg-red-100 text-red-700 hover:bg-red-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
