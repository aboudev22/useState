import { motion } from "framer-motion";
import type { RefObject } from "react";

type DragConstraint =
  | {
      top: number;
      left: number;
      right: number;
      bottom: number;
    }
  | RefObject<HTMLDivElement | null>;

export default function DragComponent({
  constraint,
}: {
  constraint: DragConstraint;
}) {
  return (
    <motion.div
      className="w-10 h-10 bg-blue-500 cursor-grab"
      whileDrag={{ scale: 1.2, rotate: 3 }}
      drag
      dragDirectionLock
      dragConstraints={constraint}
    ></motion.div>
  );
}
