"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Wallet, Banknote, Building2, Package, MapPin, Zap } from "lucide-react";

type Screen = "delivery" | "wallet" | "deposit" | "deposited";

export default function CourierApp() {
  const [screen, setScreen] = useState<Screen>("delivery");
  const [cashCollected, setCashCollected] = useState(450);
  const [earnings, setEarnings] = useState(106);
  const [showSuccess, setShowSuccess] = useState(false);

  const cashToDeposit = cashCollected - earnings;

  const handleMarkDelivered = () => {
    setCashCollected(prev => prev + 90);
    setEarnings(prev => prev + 10);
    setScreen("wallet");
  };

  const handleDeposit = (method: string) => {
    setScreen("deposited");
    setShowSuccess(true);
    setTimeout(() => {
      setCashCollected(0);
      setEarnings(0);
      setShowSuccess(false);
      setScreen("delivery");
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left: Context */}
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-3">
          Courier Experience
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight mb-4">
          What the Courier Sees
        </h1>
        <p className="text-ink-dim text-lg mb-8">
          Three screens. Settlement preview, wallet, deposit. Every screen reinforces the same message: <em>collect cash, deposit promptly, keep your earnings.</em>
        </p>

        <div className="space-y-4">
          <FlowStep
            num="01"
            title="Active Delivery"
            active={screen === "delivery"}
            done={screen !== "delivery"}
            description="Settlement preview before completion. No surprises."
          />
          <FlowStep
            num="02"
            title="Wallet Overview"
            active={screen === "wallet"}
            done={screen === "deposit" || screen === "deposited"}
            description="Cash collected vs earnings, clearly separated."
          />
          <FlowStep
            num="03"
            title="Deposit Flow"
            active={screen === "deposit"}
            done={screen === "deposited"}
            description="Multiple deposit rails. Bit is fastest."
          />
        </div>

        <div className="mt-8 p-4 bg-yellow/10 border-l-4 border-yellow rounded">
          <div className="text-xs font-mono uppercase tracking-widest font-bold mb-1">
            Try it
          </div>
          <p className="text-sm text-ink">
            Tap <strong>"Mark Delivered"</strong> in the phone to see the full flow. Numbers update in real time.
          </p>
        </div>
      </div>

      {/* Right: Phone */}
      <div className="flex justify-center">
        <div className="phone-frame w-[320px]">
          <div className="phone-screen">
            <div className="phone-notch"></div>

            {/* Status Bar */}
            <div className="px-6 pt-3 pb-2 flex justify-between text-[11px] font-semibold">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>

            <div className="flex-1 px-5 py-3 overflow-y-auto">
              {screen === "delivery" && <DeliveryScreen onComplete={handleMarkDelivered} />}
              {screen === "wallet" && (
                <WalletScreen
                  cashCollected={cashCollected}
                  earnings={earnings}
                  cashToDeposit={cashToDeposit}
                  onDeposit={() => setScreen("deposit")}
                />
              )}
              {screen === "deposit" && (
                <DepositScreen
                  amount={cashToDeposit}
                  onSelect={handleDeposit}
                  onBack={() => setScreen("wallet")}
                />
              )}
              {screen === "deposited" && <DepositedScreen />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SUBCOMPONENTS =====

function FlowStep({
  num,
  title,
  active,
  done,
  description,
}: {
  num: string;
  title: string;
  active: boolean;
  done: boolean;
  description: string;
}) {
  return (
    <div className={`flex gap-4 p-4 border rounded-lg smooth ${
      active ? "border-accent bg-accent/5" : done ? "border-line bg-line-soft" : "border-line bg-white"
    }`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold ${
        active ? "bg-accent text-white" : done ? "bg-ink text-yellow" : "bg-line-soft text-ink-dim"
      }`}>
        {done ? <CheckCircle2 size={20} /> : num}
      </div>
      <div className="flex-1">
        <div className={`font-serif font-bold text-lg ${active ? "text-ink" : "text-ink-dim"}`}>
          {title}
        </div>
        <div className="text-sm text-ink-dim mt-0.5">{description}</div>
      </div>
    </div>
  );
}

function DeliveryScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-accent text-base">HAAT Driver</div>
        <div className="bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold">
          ● ACTIVE
        </div>
      </div>

      {/* Delivery Card */}
      <div className="bg-white rounded-xl p-3.5 border border-line">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-ink-dim font-semibold mb-1">
          <MapPin size={11} /> PICKUP · 0.4 KM
        </div>
        <div className="font-bold text-sm">Burger Spot · Umm al-Fahm</div>
        <div className="text-[11px] text-ink-dim">Ibn Sina St. 12</div>

        <div className="border-t border-dashed border-line my-2.5"></div>

        <div className="text-[10px] font-mono uppercase text-ink-dim font-semibold mb-1">
          DELIVER TO
        </div>
        <div className="font-bold text-sm">Mohammad A.</div>
        <div className="text-[11px] text-ink-dim">Near the school, white house</div>

        <div className="border-t border-dashed border-line my-2.5"></div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] font-mono uppercase text-ink-dim font-semibold">
              ORDER TOTAL
            </div>
            <div className="text-2xl font-bold">₪100</div>
          </div>
          <div className="bg-yellow/30 text-yellow-700 px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1">
            <Banknote size={11} /> CASH
          </div>
        </div>
      </div>

      {/* Settlement Preview */}
      <div className="bg-gradient-to-br from-yellow/20 to-yellow/10 border border-yellow rounded-xl p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase mb-2">
          <Zap size={12} className="text-yellow-700" /> Auto-Settlement Preview
        </div>

        <div className="space-y-1.5 text-[11px]">
          <PreviewRow label="You'll collect from customer" value="₪100" />
          <PreviewRow label="HAAT + merchant share" value="₪90" muted />
          <PreviewRow label="Your delivery fee" value="+₪10" positive />
          <div className="border-t border-yellow pt-1.5 mt-2">
            <PreviewRow label="Cash to deposit after delivery" value="₪90" bold accent />
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-ink text-white py-3.5 rounded-xl font-bold text-sm smooth hover:bg-ink/90"
      >
        Mark as Delivered
      </button>
    </div>
  );
}

function PreviewRow({
  label, value, positive, muted, bold, accent
}: {
  label: string; value: string; positive?: boolean; muted?: boolean; bold?: boolean; accent?: boolean;
}) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold" : ""}`}>
      <span className={muted ? "text-ink-dim" : ""}>{label}</span>
      <span className={`font-semibold ${
        accent ? "text-accent" : positive ? "text-green-700" : muted ? "text-ink-dim" : ""
      }`}>{value}</span>
    </div>
  );
}

function WalletScreen({
  cashCollected, earnings, cashToDeposit, onDeposit
}: {
  cashCollected: number; earnings: number; cashToDeposit: number; onDeposit: () => void;
}) {
  return (
    <div className="space-y-3.5">
      <div className="flex justify-between items-center">
        <div className="font-bold text-accent text-base flex items-center gap-1.5">
          <Wallet size={16} /> My Wallet
        </div>
        <div className="bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold">
          ● ACTIVE
        </div>
      </div>

      {/* Hero card */}
      <div className="bg-gradient-to-br from-ink to-ink/80 rounded-2xl p-4 text-white animate-count">
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
          Cash to Deposit
        </div>
        <div className="text-4xl font-bold leading-none">
          <span className="text-xl text-white/60">₪</span>{cashToDeposit.toLocaleString()}
        </div>
        <div className="text-[11px] text-white/70 mt-2">
          Deposit to continue accepting cash orders
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-xl p-3.5 border border-line space-y-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-ink-dim flex items-center gap-1.5">
            <Banknote size={13} /> Cash collected today
          </span>
          <span className="font-bold">₪{cashCollected.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-ink-dim flex items-center gap-1.5">
            🛵 Your earnings today
          </span>
          <span className="font-bold text-green-700">₪{earnings.toLocaleString()}</span>
        </div>
        <div className="border-t border-line pt-2 flex justify-between items-center">
          <span className="font-semibold text-[12px]">Cash to deposit to HAAT</span>
          <span className="font-bold text-accent">₪{cashToDeposit.toLocaleString()}</span>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={onDeposit}
        className="w-full bg-accent text-white py-3 rounded-xl font-bold text-sm smooth hover:bg-accent/90"
      >
        Deposit ₪{cashToDeposit.toLocaleString()}
      </button>

      {/* Stats */}
      <div className="bg-line-soft rounded-xl p-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold mb-2">
          This Week
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-ink-dim">Avg deposit time</span>
            <span className="font-semibold">6 hours</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-ink-dim">On-time deposits</span>
            <span className="font-semibold">8 / 8 ✓</span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-ink-dim">Settlement bonus earned</span>
            <span className="bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">+₪50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DepositScreen({
  amount, onSelect, onBack
}: {
  amount: number; onSelect: (method: string) => void; onBack: () => void;
}) {
  const methods = [
    { id: "bit", icon: "💸", name: "Bit to HAAT", detail: "Instant · No fee · Auto-confirmed", tag: "FASTEST" },
    { id: "atm", icon: "🏧", name: "Bank ATM Deposit", detail: "Scan receipt · ~30 min confirmation" },
    { id: "box", icon: "📦", name: "HAAT Drop Box", detail: "3 locations nearby · Daily pickup" },
    { id: "hub", icon: "🏢", name: "HAAT Hub", detail: "In-person · Receipt provided" },
  ];

  return (
    <div className="space-y-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[11px] text-ink-dim hover:text-ink smooth"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="bg-gradient-to-br from-yellow/30 to-yellow/10 rounded-2xl p-4 text-center">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold">
          Deposit Amount
        </div>
        <div className="text-4xl font-bold mt-1">
          <span className="text-2xl text-ink-dim">₪</span>{amount.toLocaleString()}
        </div>
      </div>

      <div className="text-[11px] font-bold uppercase mt-3 mb-2">
        Choose Deposit Method
      </div>

      <div className="space-y-2">
        {methods.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`w-full bg-white border rounded-xl p-3 flex items-center gap-2.5 smooth hover:border-accent text-left ${
              i === 0 ? "border-accent border-2" : "border-line"
            }`}
          >
            <div className="w-9 h-9 bg-line-soft rounded-lg flex items-center justify-center text-base">
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[13px]">{m.name}</div>
              <div className="text-[10px] text-ink-dim">{m.detail}</div>
            </div>
            {m.tag && (
              <span className="bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                {m.tag}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function DepositedScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-count">
        <CheckCircle2 size={48} className="text-green-600" strokeWidth={2} />
      </div>
      <div className="font-serif font-bold text-2xl">Deposit Confirmed</div>
      <div className="text-ink-dim text-sm mt-2 max-w-[240px]">
        Your wallet is balanced. You can continue accepting cash orders.
      </div>
      <div className="text-[10px] text-ink-dim font-mono uppercase tracking-widest mt-6">
        Returning to delivery...
      </div>
    </div>
  );
}
