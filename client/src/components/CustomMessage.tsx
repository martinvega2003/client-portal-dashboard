import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type MessageProps = {
  type: "success" | "error";
  text: string;
  className?: string;
};

const CustomMessage: React.FC<MessageProps> = ({ type, text, className }) => {
  return (
    <div
      className={`p-3 rounded-md mb-4 flex justify-start items-center ${
        type === "success"
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-red-100 text-red-800 border border-red-300"
      } ${className ? className : ""}`}
    >
      {type === "success" ? (
        <FaCheckCircle className="mr-2 text-green-600" />
      ) : (
        <FaExclamationCircle className="mr-2 text-red-600" />
      )}
      {text}
    </div>
  );
};

export default CustomMessage;
