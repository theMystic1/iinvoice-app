"use client";

import { useDarkMode } from "../_contexts/DarkModeContext";

const nets = [1, 7, 14, 30];

function PaymentTerms({ onOpen, setNet }) {
  function handleNet(item) {
    setNet(item);
    onOpen();
  }
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`w-full shadow-xl rounded-lg absolute top-[70px] ${
        !isDarkMode ? "bg-lightMode-thirday" : "bg-darkMode-thirday"
      }`}
    >
      {nets.map((item) => (
        <NetItem key={item} item={item} onClick={() => handleNet(item)} />
      ))}
    </div>
  );
}

function NetItem({ item, onClick }) {
  return (
    <div
      className="border-b-accentPink-400 border-b p-4 text-center cursor-pointer"
      onClick={onClick}
    >
      {`Net ${item} Day${item > 1 ? "s" : ""}`}
    </div>
  );
}

export default PaymentTerms;
