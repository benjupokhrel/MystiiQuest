import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [endings, setEndings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEndings = localStorage.getItem("endings");
    if (savedEndings) {
      try {
        const parsed = JSON.parse(savedEndings);
        const sorted = parsed.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
        setEndings(sorted);
      } catch (e) {
        console.error("Failed to parse endings:", e);
        setEndings([]);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white p-8 flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/enchanted-forest.jpg')" }}
    >
      <div className="max-w-2xl w-full bg-black/60 rounded-2xl shadow-2xl p-6 border border-green-700 animate-slideUp">
        <h1 className="text-3xl font-bold text-green-300 mb-4">🌿 Your Endings</h1>

        {endings.length === 0 ? (
          <p className="text-green-200">No completed adventures yet. Go make history!</p>
        ) : (
          <ul className="space-y-4 max-h-[400px] overflow-y-auto custom-scroll">
            {endings.map((end, index) => (
              <li
                key={index}
                className="p-4 bg-black/50 rounded-lg shadow-inner border border-green-600"
              >
                <div className="font-semibold text-lime-200">
                  🌟 {end.name} the {end.class}
                </div>
                <div className="text-sm text-green-200">
                  🏁 Reached: <span className="italic">{end.ending}</span>
                </div>
                <div className="text-xs text-green-300">
                  ⏳ {new Date(end.time).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/adventure")}
            className="text-lime-300 no-underline hover:text-lime-400 transition"
          >
            ⬅ Back to Adventure
          </button>
          <button
            onClick={() => navigate("/newgame")}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full shadow-lg transition"
          >
            🔄 Start Over
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }

          .custom-scroll::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
          }

          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
};

export default History;
