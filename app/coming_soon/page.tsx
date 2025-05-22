// pages/index.tsx
import { useEffect, useState } from "react";

const targetDate = new Date("2025-07-01T00:00:00"); // Change to your launch date

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("We're live!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white px-6 text-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">🚧 Coming Soon</h1>
        <p className="text-lg md:text-xl mb-4">We’re working hard to launch our new site.</p>
        <p className="text-2xl font-semibold mb-6">{timeLeft}</p>
        <div className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email to get updates"
            className="w-full p-3 rounded-lg text-black mb-3"
          />
          <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">Notify Me</button>
        </div>
      </div>
    </main>
  );
}
