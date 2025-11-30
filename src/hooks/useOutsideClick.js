import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler,
  openModals,
  currentModalName,
  listenCapturing = true
) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (document.querySelector("dialog[open]")) {
          return;
        }
        // Check if the modal starts with "post" and depends on it, if it's clicked inside the modal return
        if (currentModalName && currentModalName.startsWith("post")) {
          const isEditModalOpen = Object.keys(openModals).filter((modal) =>
            modal.startsWith("editModal")
          );

          const isClickedInsideEditModal = isEditModalOpen.some((modal) => {
            const el = document.querySelector(`[data-modal-id="${modal}"]`);
            return el?.contains(e.target);
          });

          if (isClickedInsideEditModal) return;
        }

        if (ref.current && !ref.current.contains(e.target)) {
          handler(e);
        }
      }

      document.addEventListener("mousedown", handleClick, {
        // This allows closing the modal when clicking anywhere outside its container
        capture: listenCapturing,
      });

      return () =>
        document.removeEventListener("mousedown", handleClick, {
          capture: listenCapturing,
        });
    },
    [handler, listenCapturing, openModals, currentModalName]
  );

  return ref;
}
