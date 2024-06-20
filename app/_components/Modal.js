// components/Modal.js
"use client";
import PropTypes from "prop-types";
import { useDarkMode } from "../_contexts/DarkModeContext";

function Modal({ isOpen, onClose, children }) {
  const { isDarkMode } = useDarkMode();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`${
          isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-primary"
        } rounded-lg shadow-lg p-6 relative max-w-lg `}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
