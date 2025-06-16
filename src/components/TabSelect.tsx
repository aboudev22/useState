import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TabSelect() {
  const tabs = ["Home", "Vue", "Svelte", "React"];
  const [focusTab, setFocusTab] = useState(0);
  const [layoutProps, setLayoutProps] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLParagraphElement[]>([]);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (containerRef.current && tabsRef.current[focusTab]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = tabsRef.current[focusTab].getBoundingClientRect();
      setLayoutProps({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [focusTab]);

  return (
    <nav
      ref={containerRef}
      className="relative p-1 flex gap-2 border-[1px] border-white/20 rounded-md"
    >
      <motion.div
        layout
        animate={{ left: layoutProps.left, width: layoutProps.width }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute z-[2] top-1 bottom-1 bg-pink-500 rounded-md"
      />
      {tabs.map((tab, i) => (
        <p
          key={i}
          ref={(el) => {
            if (el) {
              tabsRef.current[i] = el;
            }
          }}
          className="text-xs z-[5] p-2 active:scale-95 text-white cursor-pointer transition-all"
          onClick={() => setFocusTab(i)}
        >
          {tab}
        </p>
      ))}
    </nav>
  );
}
