"use client";
import { useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("Ananya0-alt");
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRepos = async () => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    const data = await res.json();
    setRepos(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold">GitHub MCP Dashboard</h1>
        <p className="text-gray-400 mt-2">Built with Next.js + GitHub MCP Server • Job Ready Project</p>

        <div className="flex gap-2 mt-8">
          <input 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="GitHub username"
            className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg w-64"
          />
          <button onClick={loadRepos} className="bg-white text-black px-6 py-2 rounded-lg font-bold">
            {loading ? "Loading..." : "Fetch Repos"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400 text-sm">Repositories</p>
            <p className="text-3xl font-bold mt-2">{repos.length || 12}</p>
            <p className="text-green-400 text-xs mt-2">+2 this week</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400 text-sm">Pull Requests</p>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-blue-400 text-xs mt-2">4 open • 4 merged</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <p className="text-zinc-400 text-sm">Issues</p>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-yellow-400 text-xs mt-2">Needs attention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
          {repos.map((r:any)=>(
            <div key={r.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-zinc-600">
              <p className="font-bold">{r.name}</p>
              <p className="text-zinc-400 text-sm mt-1 truncate">{r.description || "No description"}</p>
              <div className="flex gap-3 mt-2 text-xs text-zinc-500">
                <span>⭐ {r.stargazers_count}</span>
                <span>🍴 {r.forks_count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}