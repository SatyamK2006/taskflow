import React, { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  id,
  title,
  color,
  tasks,
  canMoveLeft,
  canMoveRight,
  onAddTask,
  onDeleteTask,
  onMoveTask,
  animationDelayMs = 0,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const style = useMemo(() => {
    const key = title.toLowerCase();
    if (key.includes("progress")) {
      return {
        tint: "bg-sky-50",
        border: "border-sky-200/60",
        ring: "ring-sky-200/70",
        cardTint: "bg-sky-100/60",
        accentLeft: "border-l-sky-400",
        icon: "🚧",
        pillBg: "bg-sky-100",
        pillText: "text-sky-700",
      };
    }
    if (key.includes("done")) {
      return {
        tint: "bg-emerald-50",
        border: "border-emerald-200/60",
        ring: "ring-emerald-200/70",
        cardTint: "bg-emerald-100/60",
        accentLeft: "border-l-emerald-400",
        icon: "✅",
        pillBg: "bg-emerald-100",
        pillText: "text-emerald-700",
      };
    }
    return {
      tint: "bg-fuchsia-50",
      border: "border-fuchsia-200/60",
      ring: "ring-fuchsia-200/70",
      cardTint: "bg-fuchsia-100/60",
      accentLeft: "border-l-fuchsia-400",
      icon: "📝",
      pillBg: "bg-fuchsia-100",
      pillText: "text-fuchsia-700",
    };
  }, [title]);

  const handleAdd = (e) => {
    e.preventDefault();
    onAddTask?.(id, newTitle, newDesc);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div
      className={`rounded-2xl shadow-lg p-4 ${style.tint} border ${style.border} animate-fade-up transition hover:-translate-y-0.5 hover:shadow-xl ring-1 ${style.ring}`}
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${color} mb-3`} />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {style.icon ? (
            <span className="text-lg" aria-hidden>{style.icon}</span>
          ) : null}
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${style.pillBg} ${style.pillText}`}>{tasks.length}</span>
      </div>

      <form onSubmit={handleAdd} className="mb-4 grid grid-cols-1 gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task title"
          className="px-3 py-2 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-200 text-gray-900"
        />
        <div className="flex gap-2">
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Short description (optional)"
            className="flex-1 px-3 py-2 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-200 text-gray-900"
          />
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:from-indigo-700 hover:to-fuchsia-700 disabled:opacity-50"
            disabled={!newTitle.trim()}
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <TaskCard
              key={i}
              title={task.title}
              desc={task.desc}
              tintClass={style.cardTint}
              accentLeft={style.accentLeft}
              onDelete={() => onDeleteTask?.(id, i)}
              onMoveLeft={canMoveLeft ? () => onMoveTask?.(id, i, "left") : undefined}
              onMoveRight={canMoveRight ? () => onMoveTask?.(id, i, "right") : undefined}
              canMoveLeft={canMoveLeft}
              canMoveRight={canMoveRight}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No tasks yet.
          </p>
        )}
      </div>
    </div>
  );
}
