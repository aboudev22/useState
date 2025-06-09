import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function NotificationsIOS() {
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollapse = () => setIsCollapse(!isCollapse);

  const cards = [0, 1, 2];

  return (
    <div className="w-sm h-96 bg-neutral-900 flex gap-2 flex-col px-4 pt-20 justify-start items-center relative overflow-hidden">
      <AnimatePresence>
        {!isCollapse && (
          <motion.div
            transition={{ duration: 0.3, ease: "anticipate" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="w-52 flex justify-between z-0"
          >
            <p className="text-white text-xs font-bold">Notifications</p>
            <button
              onClick={toggleCollapse}
              className="px-1 py-[1px] text-xs text-white hover:text-black bg-neutral-800 hover:bg-white rounded-full cursor-pointer transition-all duration-300"
            >
              collapse
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-28 w-full h-full">
        <div className="relative w-full h-full">
          {cards.map((_, i) => (
            <NotificationCard
              key={i}
              index={i}
              isCollapse={isCollapse}
              onClick={toggleCollapse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationCard({
  index,
  isCollapse,
  onClick,
}: {
  index: number;
  isCollapse: boolean;
  onClick: () => void;
}) {
  const variants = {
    expanded: {
      y: index * 50, // espacement vertical (48px = h-12 + gap)
      scale: 1,
      opacity: 1,
      zIndex: 10 - index,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05,
      },
    },
    collapsed: {
      y: -index * 5,
      scale: 1 - index * 0.07,
      opacity: 1 - index * 0.15,
      zIndex: 10 - index,
      transition: {
        duration: 0.4,
        ease: "linear",
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={isCollapse ? "collapsed" : "expanded"}
      initial={false}
      onClick={onClick}
      className={clsx(
        "absolute left-0 right-0 mx-auto w-52 h-12 rounded-2xl bg-white shadow-md cursor-pointer"
      )}
    />
  );
}
