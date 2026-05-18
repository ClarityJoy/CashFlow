"use client";

import { useState } from "react";
import CourierApp from "@/components/CourierApp";
import OpsDashboard from "@/components/OpsDashboard";

export default function Home() {
  const [view, setView] = useState<"courier" | "ops">("ops");

  return (
    <div className="min-h-screen bg-bg">
      {/* Top Bar */}
      <header className="border-b border-line bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-accent font-bold text-xl tracking-tight">HAAT</div>
            <div className="text-xs font-mono uppercase tracking-widest text-ink-dim border-l border-line pl-3">
              Cash Control Platform · Prototype
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-line-soft rounded-lg p-1">
            <button
              onClick={() => setView("ops")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold smooth ${
                view === "ops"
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              Ops Dashboard
            </button>
            <button
              onClick={() => setView("courier")}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold smooth ${
                view === "courier"
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              Courier App
            </button>
          </div>

          <div className="text-xs font-mono uppercase tracking-widest text-ink-dim">
            By Asaf
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === "ops" ? <OpsDashboard /> : <CourierApp />}
      </main>

      <footer className="border-t border-line mt-12 py-6">
        <div className="max-w-7xl mx-auto px-6 text-xs font-mono uppercase tracking-widest text-ink-dim text-center">
          Interactive prototype · By Asaf · 2026
        </div>
      </footer>
    </div>
  );
}
