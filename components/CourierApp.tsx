"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Wallet, Banknote, Zap, MapPin, Plus } from "lucide-react";

type Screen = "delivery" | "wallet" | "topup" | "topupDone";

export default function CourierApp() {
  const [screen, setScreen] = useState<Screen>("delivery");
  const [balance, setBalance] = useState(380);
  const [earnings, setEarnings] = useState(106);
  const [cashInHand, setCashInHand] = useState(450);

  const lowBalance = balance < 200;

  const handleMarkDelivered = () => {
    setBalance(prev => prev - 90);
    setEarnings(prev => prev + 10);
    setCashInHand(prev => prev + 100);
    setScreen("wallet");
  };

  const handleTopUp = (method: string) => {
    setScreen("topupDone");
    setTimeout(() => {
      setBalance(prev => prev + 500);
      setScreen("wallet");
    }, 2200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-accent font-bold mb-3">
          Courier Experience
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight mb-4">
          What the Courier Sees
        </h1>
        <p className="text-ink-dim text-lg mb-6">
          The courier funds a balance with HAAT once. After every cash order, HAAT debits the balance automatically — <em>the cash collected from the customer is theirs.</em>
        </p>

        <div className="space-y-4">
          <FlowStep
            num="01"
            title="Active Delivery"
            active={screen === "delivery"}
            done={screen !== "delivery"}
            description="Settlement preview. Cash you collect is yours to keep."
          />
          <FlowStep
            num="02"
            title="Wallet & Balance"
            active={screen === "wallet"}
            done={screen === "topup" || screen === "topupDone"}
            description="Pre-funded balance. Cash earnings. Top up when low."
          />
          <FlowStep
            num="03"
            title="Top Up Balance"
            active={screen === "topup"}
            done={screen === "topupDone"}
            description="Multiple methods — cash, Bit, bank. Courier's choice."
          />
        </div>

        <div className="mt-8 p-4 bg-yellow/10 border-l-4 border-yellow rounded">
          <div className="text-xs font-mono uppercase tracking-widest font-bold mb-1">
            How it works
          </div>
          <p className="text-sm text-ink leading-relaxed">
            Each cash order debits ₪90 from the courier's HAAT balance. HAAT pays the merchant directly. The ₪100 collected from the customer stays with the courier — it's theirs.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="phone-frame w-[320px]">
          <div className="phone-screen">
            <div className="phone-notch"></div>

            <div className="px-6 pt-3 pb-2 flex justify-between text-[11px] font-semibold">
              <span>9:41</span>
              <span>📶 🔋</span>
            </div>

            <div className="flex-1 px-5 py-3 overflow-y-auto">
              {screen === "delivery" && (
                <DeliveryScreen
                  balance={balance}
                  onComplete={handleMarkDelivered}
                />
              )}
              {screen === "wallet" && (
                <WalletScreen
                  balance={balance}
                  earnings={earnings}
                  cashInHand={cashInHand}
                  lowBalance={lowBalance}
                  onTopUp={() => setScreen("topup")}
                />
              )}
              {screen === "topup" && (
                <TopUpScreen
                  currentBalance={balance}
                  onSelect={handleTopUp}
                  onBack={() => setScreen("wallet")}
                />
              )}
              {screen === "topupDone" && <TopUpDoneScreen />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowStep({
  num, title, active, done, description,
}: {
  num: string; title: string; active: boolean; done: boolean; description: string;
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

function DeliveryScreen({ balance, onComplete }: { balance: number; onComplete: () => void }) {
  return (
    <div className="space-y-3.5">
      <div className="flex justify-between items-center">
        <div className="font-bold text-accent text-base">HAAT Driver</div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] text-ink-dim font-mono">
            Bal: <span className="font-bold text-ink">₪{balance}</span>
          </div>
          <div className="bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold">
            ● ACTIVE
          </div>
        </div>
      </div>

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

      <div className="bg-gradient-to-br from-yellow/20 to-yellow/10 border border-yellow rounded-xl p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase mb-2">
          <Zap size={12} className="text-yellow-700" /> When you mark delivered
        </div>

        <div className="space-y-1.5 text-[11px]">
          <PreviewRow label="HAAT charges from your balance" value="−₪90" muted />
          <PreviewRow label="HAAT pays the merchant directly" value="auto" muted small />
          <div className="border-t border-yellow pt-1.5 mt-2 space-y-1.5">
            <PreviewRow label="Cash from customer" value="₪100" />
            <PreviewRow label="Your delivery fee earned" value="₪10" positive bold />
            <div className="bg-green-50 -mx-2 px-2 py-1.5 rounded mt-1.5">
              <PreviewRow label="₪100 is yours to keep" value="✓" bold green />
            </div>
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
  label, value, positive, muted, bold, small, green,
}: {
  label: string; value: string; positive?: boolean; muted?: boolean; bold?: boolean; small?: boolean; green?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center ${bold ? "font-bold" : ""} ${small ? "text-[10px]" : ""}`}>
      <span className={muted ? "text-ink-dim" : green ? "text-green-700" : ""}>{label}</span>
      <span className={`font-semibold ${
        green ? "text-green-700" : positive ? "text-green-700" : muted ? "text-ink-dim" : ""
      }`}>{value}</span>
    </div>
  );
}

function WalletScreen({
  balance, earnings, cashInHand, lowBalance, onTopUp,
}: {
  balance: number; earnings: number; cashInHand: number; lowBalance: boolean; onTopUp: () => void;
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

      <div className={`rounded-2xl p-4 text-white animate-count ${
        lowBalance ? "bg-gradient-to-br from-accent to-accent/80" : "bg-gradient-to-br from-ink to-ink/80"
      }`}>
        <div className="text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1.5">
          HAAT Balance
        </div>
        <div className="text-4xl font-bold leading-none">
          <span className="text-xl text-white/60">₪</span>{balance.toLocaleString()}
        </div>
        <div className="text-[11px] text-white/80 mt-2">
          {lowBalance
            ? "⚠ Low — top up to keep accepting cash orders"
            : "Available for cash orders"}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-3.5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-green-800 font-semibold mb-2 flex items-center gap-1">
          <Banknote size={11} /> Cash in Your Pocket
        </div>
        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-2xl font-bold text-green-800">
              ₪{cashInHand.toLocaleString()}
            </div>
            <div className="text-[11px] text-green-700 mt-0.5">
              Yours to keep — already paid for
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-green-700 font-semibold">
              Of which earnings
            </div>
            <div className="text-base font-bold text-green-800">₪{earnings.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <button
        onClick={onTopUp}
        className={`w-full py-3 rounded-xl font-bold text-sm smooth flex items-center justify-center gap-1.5 ${
          lowBalance
            ? "bg-accent text-white hover:bg-accent/90"
            : "bg-ink text-white hover:bg-ink/90"
        }`}
      >
        <Plus size={16} />
        Top Up Balance
      </button>

      <div className="bg-line-soft rounded-xl p-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold mb-2">
          This Week
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-ink-dim">Avg balance maintained</span>
            <span className="font-semibold">₪520</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-ink-dim">Cash orders completed</span>
            <span className="font-semibold">38 ✓</span>
          </div>
          <div className="flex justify-between text-[11px] items-center">
            <span className="text-ink-dim">Reliability bonus earned</span>
            <span className="bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">+₪50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopUpScreen({
  currentBalance, onSelect, onBack,
}: {
  currentBalance: number; onSelect: (method: string) => void; onBack: () => void;
}) {
  const [amount, setAmount] = useState(500);
  const methods = [
    { id: "cash", icon: "💵", name: "Pay with cash you have", detail: "Drop box or HAAT hub · Receipt confirmed", tag: "POPULAR" },
    { id: "bit", icon: "💸", name: "Pay with Bit", detail: "Instant · No fee · From your bank" },
    { id: "transfer", icon: "🏦", name: "Bank transfer", detail: "1-2 hours confirmation" },
    { id: "card", icon: "💳", name: "Debit card", detail: "Instant · 0.5% fee" },
  ];
  const amounts = [200, 500, 1000];

  return (
    <div className="space-y-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-[11px] text-ink-dim hover:text-ink smooth"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="bg-gradient-to-br from-yellow/30 to-yellow/10 rounded-2xl p-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink-dim font-semibold">
          Current Balance
        </div>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl font-bold">
            <span className="text-base text-ink-dim">₪</span>{currentBalance}
          </div>
          <div className="text-[11px] text-ink-dim">
            After top-up: <span className="font-bold text-ink">₪{currentBalance + amount}</span>
          </div>
        </div>
      </div>

      <div className="text-[11px] font-bold uppercase mt-3 mb-1.5">
        Choose Amount
      </div>
      <div className="grid grid-cols-3 gap-2">
        {amounts.map(a => (
          <button
            key={a}
            onClick={() => setAmount(a)}
            className={`py-2 rounded-lg text-sm font-bold smooth border ${
              amount === a
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink border-line hover:border-ink"
            }`}
          >
            ₪{a}
          </button>
        ))}
      </div>

      <div className="text-[11px] font-bold uppercase mt-3 mb-1.5">
        Payment Method
      </div>

      <div className="space-y-2">
        {methods.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className={`w-full bg-white border rounded-xl p-2.5 flex items-center gap-2.5 smooth hover:border-accent text-left ${
              i === 0 ? "border-accent border-2" : "border-line"
            }`}
          >
            <div className="w-8 h-8 bg-line-soft rounded-lg flex items-center justify-center text-sm">
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[12px]">{m.name}</div>
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

function TopUpDoneScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-count">
        <CheckCircle2 size={48} className="text-green-600" strokeWidth={2} />
      </div>
      <div className="font-serif font-bold text-2xl">Balance Topped Up</div>
      <div className="text-ink-dim text-sm mt-2 max-w-[240px]">
        You can keep accepting cash orders. Your balance is ready.
      </div>
      <div className="text-[10px] text-ink-dim font-mono uppercase tracking-widest mt-6">
        Returning to wallet...
      </div>
    </div>
  );
}
