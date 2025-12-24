"use client";
import { useAuth } from "@/context/AuthContext";
import { Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CountdownTimer from "@/components/CountDown";

export default function Navbar() {
  const router = useRouter();
  const { userId, loggedIn, loading } = useAuth();
  const { logout } = useAuth();
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getScore() {
      const response = await fetch(`/api/score?userId=${userId}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setScore(data.points);
      } else {
        setScore(0);
      }
    }
    getScore();
  }, [userId]);
  const logoutCall = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      logout();
      toast.success("Logged Out");
      router.push("/login");
    }
  };
  return (
    <nav className="z-50  top-0 border-b border-blue-500/20 backdrop-blur-xl ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">CodeWarz</p>
          </a>

          {!loggedIn ? (
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="cursor-pointer font-semibold"
            >
              Login
            </button>
          ) : (
            <div className="flex space-x-8 justify-between items-center">
              <p className="font-bold text-xl">
                {" "}
                <span className="text-neutral-500">Score :</span> {score}
              </p>
              <div>
                <CountdownTimer />
              </div>

              <button
                onClick={logoutCall}
                className="text-red-600 cursor-pointer font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
