import { useEffect, useState } from "react";
import storyData from "../data/story.json";
import { useNavigate } from "react-router-dom";

const Adventure = () => {
  const navigate = useNavigate();
  const [currentNode, setCurrentNode] = useState("start");
  const [player, setPlayer] = useState({ name: "", charClass: "" });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const savedNode = localStorage.getItem("currentNode") || "start";
    const savedPlayer = JSON.parse(localStorage.getItem("player") || "{}");
    const savedInventory = JSON.parse(localStorage.getItem("inventory") || "[]");

    setCurrentNode(savedNode);
    setPlayer(savedPlayer);
    setInventory(savedInventory);
  }, []);

  const makeChoice = (choice) => {
    const nextNode = choice.next;
    setCurrentNode(nextNode);
    localStorage.setItem("currentNode", nextNode);

    if (choice.item) {
      const updatedInventory = [...inventory, choice.item];
      setInventory(updatedInventory);
      localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    }

    if (storyData[nextNode]?.choices?.length === 0) {
      const endings = JSON.parse(localStorage.getItem("endings") || "[]");
      endings.push({
        name: player.name,
        class: player.charClass,
        ending: storyData[nextNode].text,
        time: new Date().toISOString(),
      });
      localStorage.setItem("endings", JSON.stringify(endings));
    }
  };

  const storyNode = storyData[currentNode];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/assets/enchanted-forest.jpg')" }}
    >
      {/* 🌫️ Animated Mist Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/assets/mist.png')] bg-cover bg-no-repeat opacity-20 animate-[mist_30s_linear_infinite] pointer-events-none" />

      {/* 📜 Content */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-white animate-[fadeZoom_0.6s_ease-out]">
        {/* 🧙 Character Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/assets/wizard-icon.png"
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-lg animate-pulse"
          />
          <h2 className="text-xl font-semibold text-yellow-400 animate-[fadeZoom_0.6s_ease-out]">
            ✨ {player.name} the {player.charClass}
          </h2>
        </div>

        {/* 📖 Story Text */}
        <p className="text-lg mb-6 animate-[fadeZoom_0.6s_ease-out]">
          {storyNode?.text}
        </p>

        {/* 📜 Scroll Image */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/choice-scroll.png"
            alt="scroll"
            className="w-24 h-auto animate-pulse"
          />
        </div>

        {/* 🎯 Choices */}
        <div className="flex flex-col gap-3">
          {storyNode?.choices?.map((choice, index) => (
            <button
              key={index}
              onClick={() => makeChoice(choice)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform transform hover:scale-105 hover:shadow-xl animate-[fadeZoom_0.6s_ease-out]"
            >
              <img
                src="/assets/choice-scroll.png"
                alt="choice"
                className="w-5 h-5"
              />
              {choice.text}
            </button>
          ))}

          {storyNode?.choices?.length === 0 && (
            <button
              onClick={() => navigate("/history")}
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded animate-[fadeZoom_0.6s_ease-out]"
            >
              View Your Ending
            </button>
          )}
        </div>

        {/* 🧭 Navigation */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate("/inventory")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            🎒 Inventory
          </button>
          <button
            onClick={() => navigate("/map")}
            className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded"
          >
            🗺️ Map
          </button>
          <button
            onClick={() => navigate("/newgame")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adventure;
