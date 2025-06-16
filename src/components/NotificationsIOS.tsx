import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function NotificationsIOS() {
  const [isCollapse, setIsCollapse] = useState(false);
  const toggleCollapse = () => setIsCollapse(!isCollapse);

  const cards = [0, 1, 2];

  return (
    <div className="w-sm h-96 bg-neutral-900 flex gap-2 flex-col px-4 pt-20 justify-start items-center relative overflow-hidden">
      <div className="h-6 w-52 flex justify-between z-0 relative">
        <AnimatePresence>
          {!isCollapse && (
            <motion.div
              transition={{ duration: 0.3, ease: "anticipate" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute top-0 left-0 w-full flex justify-between"
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
      </div>

      <div className="relative gap-1 flex flex-col items-center justify-center w-full">
        <AnimatePresence>
          {cards.map((_, i) => (
            <NotificationCard
              key={i}
              index={i}
              isCollapse={isCollapse}
              onClick={toggleCollapse}
            />
          ))}
        </AnimatePresence>
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
      y: index * 1, // Espacement vertical entre les cartes
      scale: 1,
      zIndex: 10 - index,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
      },
    },
    collapsed: {
      y: -index * 7,
      scale: 1 - index * 0.07,
      zIndex: 10 - index,
      opacity: 1 - index * 0.15,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
      },
    },
  };

  return (
    <motion.div
      layout
      variants={variants}
      animate={isCollapse ? "collapsed" : "expanded"}
      initial={false}
      onClick={onClick}
      className={clsx(
        "w-52 h-12 rounded-2xl bg-white shadow-md cursor-pointer",
        isCollapse ? "absolute left-0 top-0 right-0 mx-auto" : "relative"
      )}
    />
  );
}