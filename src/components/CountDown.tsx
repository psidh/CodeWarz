"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const targetTime = new Date('2025-12-24T12:00:00+05:30').getTime();
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

  const isUrgent = timeLeft <= 25 * 60 * 1000;
  const colorClass = isUrgent ? "text-red-400" : "text-blue-400";
  return (
    <div className={`flex text-blue-400 justify-center text-center font-mono ${colorClass}`}>
      <TimeBox label="h" value={hours} />
      <TimeBox label="min" value={minutes} />
      <TimeBox label="sec" value={seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-4 py-2 flex items-baseline gap-[2px] rounded-xl">
      <div className="text-xl font-bold">{String(value).padStart(2, '0')}</div>
      <div className="text-sm font-semibold text-blue-400 mt-1">{label}</div>
    </div>
  );
}
