import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 to-fuchsia-600 bg-clip-text text-transparent">TaskFlow</h1>
    </nav>
  );
}
