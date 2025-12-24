"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const targetTime = new Date('2025-12-24T10:00:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetTime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  if (timeLeft <= 0) {
    return (
      <div className="text-2xl font-bold text-green-400">
        Contest Started 🚀
      </div>
    );
  }

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex text-blue-400 justify-center gap-6 text-center font-mono">
      <TimeBox label="HRS" value={hours} />
      <TimeBox label="MIN" value={minutes} />
      <TimeBox label="SEC" value={seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700">
      <div className="text-3xl font-bold">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
