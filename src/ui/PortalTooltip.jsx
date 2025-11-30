import { createPortal } from "react-dom";

function PortalTooltip({ children, position }) {
  //creating the portal to put div at the top of  the page
  return createPortal(
    <div
      className="absolute bg-gray-800 text-white text-xs px-2 rounded-lg z-[9999] w-auto max-w-[200px] whitespace-pre-line"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export default PortalTooltip;
