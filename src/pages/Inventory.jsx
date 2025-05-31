import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    setItems(savedInventory);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/assets/enchanted-forest.jpg')" }}
    >
      {/* Inventory Panel */}
      <div className="relative z-10 w-full max-w-lg mx-auto mt-20 bg-white/80 rounded-2xl shadow-2xl p-8 border border-white/30 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-lime-600 mb-6 text-center animate-float">
          🎒 Your Inventory
        </h1>

        {items.length === 0 ? (
          <p className="text-green-700 text-center">Your satchel is empty... for now.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scroll">
            {items.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-white/90 border border-lime-200 rounded-lg shadow-md hover:shadow-lime-400 transition duration-300"
              >
                <div className="text-lime-800 font-semibold">🧿 {item}</div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate("/adventure")}
            className="text-lime-700 font-medium hover:text-lime-900 transition"
          >
            ⬅ Back to Adventure
          </button>

          <button
            onClick={() => navigate("/newgame")}
            className="bg-lime-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-lime-400 transition duration-300"
          >
            🔄 Start Over
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default Inventory;
