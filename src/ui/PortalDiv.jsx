import { forwardRef, useState } from "react";
import PortalTooltip from "./PortalTooltip";

// It is ref to get the rect of the div
const PortalDiv = forwardRef(function PortalDiv({ likesCount, likes }, ref) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function handleMouseEnter() {
    // getting the rect of the div and showing it
    const rect = ref?.current?.getBoundingClientRect?.();

    if (!rect) return;

    //setting position
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setShowTooltip(true);
  }

  function handleMouseLeave() {
    setShowTooltip(false);
  }
  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-gray-300 group text-xs sm:text-sm cursor-pointer z-50 hover:underline"
    >
      {likesCount > 0 &&
        `${likesCount} ${
          likesCount === 1 ? "like" : likesCount > 1 ? "likes" : ""
        }`}
      {showTooltip && (
        <PortalTooltip position={position}>
          {likes?.usersIds?.length > 0
            ? likes.usersIds.map((u) => (
                <div key={u.id} className="my-2">
                  {u.username}
                </div>
              ))
            : "No users liked this yet."}
        </PortalTooltip>
      )}
    </div>
  );
});

export default PortalDiv;
