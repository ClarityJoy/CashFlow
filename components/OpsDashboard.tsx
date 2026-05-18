"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp, TrendingDown, AlertTriangle, AlertCircle, CheckCircle,
  Users, Building2, Clock, Zap, ArrowRight, Filter, Download, Bell
} from "lucide-react";

const couriers = [
  { name: "Ahmad Hassan", id: "CR-2847", city: "Nazareth", float: 2840, lastDeposit: "47h", risk: "HIGH" },
  { name: "Omar Khaled", id: "CR-1593", city: "Umm al-Fahm", float: 2210, lastDeposit: "31h", risk: "HIGH" },
  { name: "Yousef Ali", id: "CR-3201", city: "Haifa", float: 1940, lastDeposit: "22h", risk: "MED" },
  { name: "Sami Daher", id: "CR-2105", city: "Baqa al-Gharbiya", float: 1680, lastDeposit: "18h", risk: "MED" },
  { name: "Khalil Mansour", id: "CR-4521", city: "Tira", float: 1420, lastDeposit: "9h", risk: "LOW" },
];

const merchants = [
  { name: "Falafel King", city: "Tira", debt: 8400, maxDays: 45, aging: [10, 25, 65] },
  { name: "Pizza Roma", city: "Haifa", debt: 5200, maxDays: 22, aging: [30, 70, 0] },
  { name: "Sweet Corner", city: "Nazareth", debt: 3800, maxDays: 12, aging: [60, 40, 0] },
  { name: "Burger Spot", city: "Umm al-Fahm", debt: 2150, maxDays: 8, aging: [80, 20, 0] },
];

const alerts = [
  { type: "HIGH", icon: "🚨", title: "12 couriers exceeded cash cap", body: "Cash dispatch suspended automatically. Notified to deposit before next pickup." },
  { type: "MED", icon: "⚠", title: "Falafel King: ₪8,400 debt aging", body: "45 days outstanding · Auto-deduct from next credit settlement scheduled." },
  { type: "MED", icon: "⚠", title: "Settlement delay: Nazareth zone", body: "Avg time-to-deposit: 14h (target: 4h). 3 couriers driving the average." },
];

export default function OpsDashboard() {
  const [seconds, setSeconds] = useState(3);
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-ink text-white rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Cash Control Center</h1>
          <div className="text-xs font-mono uppercase tracking-widest text-white/60 mt-1">
            Financial Operations · Live View
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-xs text-white/60 live-dot">
              Real-time · Updated {seconds}s ago
            </div>
            <div className="text-xs text-white/60 mt-1">📅 Today · Nov 18, 2026</div>
          </div>

          <div className="flex gap-2">
            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 smooth">
              <Filter size={12} /> Filter
            </button>
            <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 smooth">
              <Download size={12} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard
          label="Total Courier Float"
          value="847,200"
          unit="₪"
          change="-12%"
          changeDir="down"
          sub="Across 1,243 active couriers"
        />
        <KpiCard
          label="Outstanding Partner Debt"
          value="312,500"
          unit="₪"
          change="-8%"
          changeDir="down"
          sub="427 merchants with balance"
        />
        <KpiCard
          label="Avg Time-to-Settlement"
          value="5.8"
          unit="h"
          change="-35%"
          changeDir="down"
          sub="Target: under 4h"
        />
        <KpiCard
          label="Auto-Settlement Rate"
          value="96.2"
          unit="%"
          change="+2.1%"
          changeDir="up"
          sub="Target: above 95%"
        />
      </div>

      {/* Cash Flow Viz */}
      <div className="bg-white rounded-2xl border border-line p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif font-bold text-lg">Today's Cash Movement</h2>
            <div className="text-xs font-mono uppercase tracking-widest text-ink-dim mt-0.5">
              End-to-end flow · Live tracking
            </div>
          </div>
          <div className="text-xs text-ink-dim live-dot">Updating</div>
        </div>

        <div className="grid grid-cols-9 items-center gap-1">
          <FlowNode amount="1.2M" label="Customers Paid" color="green" />
          <FlowArrow />
          <FlowNode amount="847K" label="Held by Couriers" color="amber" warning />
          <FlowArrow />
          <FlowNode amount="353K" label="Deposited" color="ink" />
          <FlowArrow />
          <FlowNode amount="298K" label="Paid to Merchants" color="green" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Risk Couriers */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-line p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg">Top Risk Couriers</h2>
              <div className="text-xs font-mono uppercase tracking-widest text-ink-dim mt-0.5">
                Highest cash float · Aging not deposited
              </div>
            </div>
            <button className="text-xs text-accent font-semibold hover:underline">
              View all →
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-line">
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold py-2">
                  Courier
                </th>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold py-2">
                  Float
                </th>
                <th className="text-left text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold py-2">
                  Last Deposit
                </th>
                <th className="text-center text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold py-2">
                  Risk
                </th>
                <th className="text-right text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {couriers.map((c) => (
                <tr key={c.id} className="border-b border-line-soft hover:bg-line-soft/30 smooth">
                  <td className="py-3">
                    <div className="font-semibold text-sm">{c.name}</div>
                    <div className="text-[10px] font-mono text-ink-dim">{c.id} · {c.city}</div>
                  </td>
                  <td className="py-3 font-bold text-sm">₪{c.float.toLocaleString()}</td>
                  <td className="py-3 text-xs text-ink-dim">{c.lastDeposit} ago</td>
                  <td className="py-3 text-center">
                    <RiskBadge level={c.risk} />
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-xs text-accent font-semibold hover:underline">
                      Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-2xl border border-line p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-lg flex items-center gap-2">
                <Bell size={18} /> Active Alerts
              </h2>
              <div className="text-xs font-mono uppercase tracking-widest text-ink-dim mt-0.5">
                Requires attention
              </div>
            </div>
            <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {alerts.length}
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map((a, i) => (
              <AlertCard key={i} {...a} />
            ))}
          </div>
        </div>
      </div>

      {/* Merchant Debt */}
      <div className="bg-white rounded-2xl border border-line p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif font-bold text-lg">Top Risk Merchants</h2>
            <div className="text-xs font-mono uppercase tracking-widest text-ink-dim mt-0.5">
              Outstanding debt · Aging breakdown
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-sm"></span> 0-7 days
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow rounded-sm"></span> 7-30 days
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-accent rounded-sm"></span> 30+ days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {merchants.map((m, i) => (
            <MerchantRow key={i} {...m} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="bg-yellow/10 border-l-4 border-yellow rounded-r-lg p-4 text-sm text-ink">
        <strong className="font-serif">Note on this prototype:</strong> Dashboard interactive prototype demonstrates the core interaction model — KPI tracking, risk identification, alert handling, and end-to-end cash visibility. Production version would include drill-down per courier/merchant, exportable reconciliation reports, full audit trail at ledger level, and configurable SLA thresholds per zone.
      </div>
    </div>
  );
}

// ===== SUBCOMPONENTS =====

function KpiCard({
  label, value, unit, change, changeDir, sub,
}: {
  label: string; value: string; unit: string; change: string; changeDir: "up" | "down"; sub: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-line p-5 smooth hover:border-accent/30 hover:shadow-sm">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold mb-2">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        {unit === "₪" && <span className="text-base text-ink-dim font-semibold">₪</span>}
        <span className="text-3xl font-bold leading-none">{value}</span>
        {unit !== "₪" && <span className="text-base text-ink-dim font-semibold">{unit}</span>}
      </div>
      <div className={`text-xs font-semibold mt-2 flex items-center gap-1 ${
        changeDir === "down" ? "text-green-700" : "text-green-700"
      }`}>
        {changeDir === "down" ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
        {change} vs last week
      </div>
      <div className="text-[10px] text-ink-dim mt-1">{sub}</div>
    </div>
  );
}

function FlowNode({
  amount, label, color, warning
}: {
  amount: string; label: string; color: "green" | "amber" | "ink"; warning?: boolean;
}) {
  const colorClass = color === "green" ? "text-green-700" : color === "amber" ? "text-yellow-700" : "text-ink";
  const bgClass = color === "green" ? "bg-green-50" : color === "amber" ? "bg-yellow/10" : "bg-line-soft";

  return (
    <div className={`col-span-2 ${bgClass} rounded-xl p-3.5 text-center relative ${warning ? "border-2 border-yellow" : "border border-line"}`}>
      {warning && (
        <div className="absolute -top-2 -right-2 bg-yellow text-ink rounded-full w-6 h-6 flex items-center justify-center">
          <AlertTriangle size={12} />
        </div>
      )}
      <div className={`text-xl font-bold ${colorClass}`}>₪{amount}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim mt-1 font-semibold">
        {label}
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="col-span-1 flex justify-center">
      <ArrowRight size={20} className="text-ink-dim" />
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const styles = {
    HIGH: "bg-accent/15 text-accent",
    MED: "bg-yellow/30 text-yellow-700",
    LOW: "bg-green-100 text-green-700",
  }[level] || "bg-line-soft text-ink-dim";

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${styles}`}>
      {level}
    </span>
  );
}

function AlertCard({ type, icon, title, body }: { type: string; icon: string; title: string; body: string }) {
  const styles = type === "HIGH"
    ? "bg-accent/10 border-accent"
    : "bg-yellow/10 border-yellow";

  return (
    <div className={`border-l-4 ${styles} rounded-r-lg p-3.5`}>
      <div className="font-bold text-sm mb-1">{icon} {title}</div>
      <div className="text-xs text-ink-dim leading-relaxed">{body}</div>
    </div>
  );
}

function MerchantRow({
  name, city, debt, maxDays, aging
}: {
  name: string; city: string; debt: number; maxDays: number; aging: number[];
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div>
          <span className="font-semibold text-sm">{name}</span>
          <span className="text-xs text-ink-dim ml-2">· {city}</span>
        </div>
        <div className="text-right">
          <div className="font-bold text-sm">₪{debt.toLocaleString()}</div>
          <div className="text-[10px] text-ink-dim">{maxDays}d max</div>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden flex bg-line-soft">
        {aging[0] > 0 && <div className="bg-green-500" style={{ width: `${aging[0]}%` }}></div>}
        {aging[1] > 0 && <div className="bg-yellow" style={{ width: `${aging[1]}%` }}></div>}
        {aging[2] > 0 && <div className="bg-accent" style={{ width: `${aging[2]}%` }}></div>}
      </div>
    </div>
  );
}
