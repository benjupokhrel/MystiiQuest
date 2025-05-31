import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storyData from "../data/story.json";

const WorldMap = () => {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState("start");
  const navigate = useNavigate();

  useEffect(() => {
    const savedNode = localStorage.getItem("currentNode") || "start";
    const savedVisited = JSON.parse(localStorage.getItem("visitedNodes") || "[]");

    if (!savedVisited.includes(savedNode)) {
      savedVisited.push(savedNode);
      localStorage.setItem("visitedNodes", JSON.stringify(savedVisited));
    }

    setVisitedNodes(savedVisited);
    setCurrentNode(savedNode);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 flex items-center justify-center"
      style={{ backgroundImage: "url('/assets/enchanted-forest.jpg')" }}
    >
      <div className="max-w-4xl w-full bg-white/70 border border-white/30 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">🗺️ MystiQuest World Map</h1>
        <p className="text-gray-800 mb-6">
          These are the magical locations you've explored on your journey:
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(storyData).map(([key, node]) => (
            <li
              key={key}
              className={`p-4 rounded-xl text-center shadow-md border transition-all
                ${
                  currentNode === key
                    ? "bg-indigo-500 text-white font-bold border-indigo-700"
                    : visitedNodes.includes(key)
                    ? "bg-green-200 text-green-900 font-semibold border-green-400"
                    : "bg-gray-100 text-gray-400 italic border-gray-300"
                }`}
            >
              {node.title || key}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/adventure")}
            className="text-purple-700 no-underline hover:text-purple-900 transition"
          >
            ⬅ Back to Adventure
          </button>

          <button
            onClick={() => navigate("/newgame")}
            className="bg-purple-600 text-white px-4 py-2 rounded-full shadow hover:bg-purple-700 transition"
          >
            🔄 Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
