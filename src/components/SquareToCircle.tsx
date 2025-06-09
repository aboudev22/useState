import { motion } from "framer-motion";

export default function SquareToCircle() {
  return (
    <motion.div
      animate={{ y: [20, 0, 20] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
      className="w-20 h-20 rounded-full bg-violet-500 transform-gpu"
    />
  );
}
