import { useEffect, useState } from "react";

export default function MotionFrame({ children, active }) {
  const [show, setShow] = useState(active);

  useEffect(() => {
    if (active) setShow(true);
  }, [active]);

  if (!show) return null;

  return (
    <div
      className={`
        fixed inset-0 z-20
        transition-all duration-500 ease-out
        ${active ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"}
      `}
    >
      {children}
    </div>
  );
}
