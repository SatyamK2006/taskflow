import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import TaskColumn from "./components/TaskColumn";

export default function App() {
  const defaultColumns = useMemo(
    () => [
      {
        id: 1,
        title: "To Do",
        color: "from-fuchsia-500 to-pink-500",
        tasks: [
          { title: "Design UI", desc: "Create wireframe for dashboard" },
          { title: "Write docs", desc: "Add project setup guide" },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        color: "from-sky-500 to-cyan-500",
        tasks: [
          { title: "Navbar Component", desc: "Implement dark mode toggle" },
        ],
      },
      {
        id: 3,
        title: "Done",
        color: "from-emerald-500 to-teal-500",
        tasks: [
          { title: "Project Setup", desc: "Tailwind + Vite configured" },
        ],
      },
    ],
    []
  );

  const [columns, setColumns] = useState(() => {
    const stored = localStorage.getItem("taskflow.columns");
    return stored ? JSON.parse(stored) : defaultColumns;
  });

  useEffect(() => {
    localStorage.setItem("taskflow.columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, title, desc) => {
    if (!title?.trim()) return;
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [{ title, desc }, ...col.tasks] }
          : col
      )
    );
  };

  const deleteTask = (columnId, index) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((_, i) => i !== index) }
          : col
      )
    );
  };

  const moveTask = (fromColumnId, index, direction) => {
    setColumns((prev) => {
      const fromIdx = prev.findIndex((c) => c.id === fromColumnId);
      if (fromIdx === -1) return prev;
      const toIdx = direction === "left" ? fromIdx - 1 : fromIdx + 1;
      if (toIdx < 0 || toIdx >= prev.length) return prev;

      const fromCol = prev[fromIdx];
      const toCol = prev[toIdx];
      const task = fromCol.tasks[index];
      if (!task) return prev;

      const newFromTasks = fromCol.tasks.filter((_, i) => i !== index);
      const newToTasks = [task, ...toCol.tasks];

      const next = [...prev];
      next[fromIdx] = { ...fromCol, tasks: newFromTasks };
      next[toIdx] = { ...toCol, tasks: newToTasks };
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      <main className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {columns.map((col, idx) => (
          <TaskColumn
            key={col.id}
            id={col.id}
            title={col.title}
            color={col.color}
            tasks={col.tasks}
            canMoveLeft={idx > 0}
            canMoveRight={idx < columns.length - 1}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            animationDelayMs={idx * 80}
          />
        ))}
      </main>
    </div>
  );
}
