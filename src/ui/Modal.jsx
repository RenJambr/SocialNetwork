import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useLocation } from "react-router";

const ModalContext = createContext();

function Modal({ children }) {
  // Get location of modal
  const location = useLocation();
  const [openModals, setOpenModals] = useState({});

  // Open modal function
  const open = (name) => {
    setOpenModals((prev) => ({ ...prev, [name]: true }));
  };
  // Close modal function
  const close = (name) => {
    setOpenModals((prev) => ({ ...prev, [name]: false }));
  };

  // Effect for close all modals if path chagnes
  useEffect(() => {
    setOpenModals({});
  }, [location.pathname]);

  return (
    <ModalContext.Provider value={{ openModals, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// Clone child element and add onClick and classname props
function Open({ opens, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opens),
    className: `${children.props.className ?? ""} modal`.trim(),
  });
}

function Window({ children, name, isPrompt = false, customWidth = "" }) {
  const { close, openModals } = useContext(ModalContext);
  const isOpen = openModals?.[name] === true;
  const currentModalName = name;

  const closeModal = () => {
    close(name);
  };

  // If user clicks outside the modal it closes
  const ref = useOutsideClick(closeModal, openModals, currentModalName);

  if (!isOpen) return null;

  // Creating a portal to show it on the top of the html structure
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-[#1111118a] backdrop-blur-sm z-[1000] transition-all duration-500">
      <div
        onClick={(e) => e.stopPropagation()}
        ref={ref}
        data-modal-id={name}
        className={`${
          isPrompt
            ? "w-auto min-w-[300px]"
            : "w-full xs:w-auto sm:min-w-[700px]"
        } ${
          customWidth && `min-w-auto ${customWidth} w-full`
        } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-lg px-5 py-5  shadow-[#000000]  transition-all duration-500`}
      >
        <button
          onClick={closeModal}
          className="bg-none border-none p-[0.4rem] rounded-sm translate-x-[0.8rem] transition-all duration-200 absolute top-[0.5rem] right-[1.9rem]"
        >
          <HiXMark color={"#fff"} cursor={"pointer"} />
        </button>
        <div>
          {typeof children === "function" ? (
            children(closeModal)
          ) : children?.type === "img" ? (
            <Zoom>{children}</Zoom>
          ) : (
            children
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
