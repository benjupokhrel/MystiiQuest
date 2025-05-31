import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NewGame = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    localStorage.clear();
    navigate("/"); // Navigate to StartGame
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/assets/enchanted-forest.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/30 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl border border-white/20 text-center max-w-md w-full"
      >
        <img
          src="/assets/wizard-icon.png"
          alt="Magical Reset"
          className="w-24 h-24 mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-3">🌟 Begin Anew</h1>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Are you sure you want to reset your journey? All progress, inventory, and history will be lost.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleReset}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition text-sm"
          >
            ✨ Yes, Start Over
          </button>
          <button
            onClick={() => navigate("/adventure")}
            className="bg-white text-indigo-600 px-4 py-2 rounded-full border border-indigo-400 hover:bg-indigo-100 transition text-sm"
          >
            No, Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NewGame;
