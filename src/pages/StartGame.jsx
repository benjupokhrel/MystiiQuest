import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const [name, setName] = useState("");
  const [charClass, setCharClass] = useState("Mage");
  const navigate = useNavigate();

  const start = () => {
    localStorage.setItem("player", JSON.stringify({ name, charClass }));
    localStorage.setItem("currentNode", "start");
    localStorage.setItem("inventory", JSON.stringify([]));
    navigate("/adventure");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Background with slow zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-animation"
        style={{
          backgroundImage: "url('/assets/Forest-bg.jpg')",
          zIndex: -2,
        }}
      ></div>

      {/* Fade-in main content */}
      <div className="relative z-10 p-6 flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-xl">
          MystiQuest
        </h1>

        <input
          className="bg-white/20 border border-white/30 text-white p-3 rounded-md w-full max-w-xs placeholder-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="bg-white/20 border border-white/30 text-white p-3 rounded-md w-full max-w-xs backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          value={charClass}
          onChange={(e) => setCharClass(e.target.value)}
        >
          <option>Mage</option>
          <option>Rogue</option>
          <option>Warrior</option>
        </select>

        <button
          onClick={start}
          className="bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:shadow-yellow-500/50"
        >
          🗡️ Begin Adventure
        </button>
      </div>

      {/* Tailwind animation styles */}
      <style>{`
        @keyframes zoomSlow {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }

        .scale-animation {
          animation: zoomSlow 30s ease-in-out infinite alternate;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StartGame;
