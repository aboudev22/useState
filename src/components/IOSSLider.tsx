import { useState } from "react";
import { Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function IOSSlider() {
  const [level, setLevel] = useState(50); // Valeur entre 0 et 100

  const increase = () => setLevel((prev) => Math.min(prev + 10, 100));
  const decrease = () => setLevel((prev) => Math.max(prev - 10, 0));

  return (
    <div
      className="h-32 w-16 bg-slate-900 rounded-3xl flex justify-center items-end relative overflow-hidden cursor-pointer"
      onClick={increase}
      onContextMenu={(e) => {
        e.preventDefault();
        decrease();
      }}
    >
      {/* Barre blanche animée */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-b-3xl"
        style={{ height: `${level}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      {/* Icône */}
      <div className="z-10 pb-4 text-yellow-500">
        <Sun />
      </div>
    </div>
  );
}
