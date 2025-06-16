import { motion } from "framer-motion";

export default function BtnTest() {
  return (
    <motion.div
      whileHover={{ scale: 1.2, transition: { duration: 1 } }}
      whileTap={{ scale: 0.9, rotate: 3 }}
      className="p-2 bg-black text-white rounded-md cursor-pointer will-change-transform"
    >
      BtnTest
    </motion.div>
  );
}
