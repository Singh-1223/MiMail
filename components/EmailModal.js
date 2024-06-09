import { classificationColor } from "@/utils/classificationColour";
import React from "react";

const EmailModal = ({ email, onClose }) => (
  <div
    className={`modal fixed right-0 top-0 w-[90%] md:w-[50%] h-screen overflow-hidden p-4 bg-slate-700 border-l-2 border-slate-400 rounded-2xl opacity-100 z-2 transition-all duration-300 ease-in-out ${
      email ? "transform translate-x-0" : "transform translate-x-full"
    }`}
  >
    <div className="flex border-b-4 border-slate-300 justify-between pb-2">
      <div className="text-white">{email.from.split("<")[0].trim()}</div>
     
      <div className="font-bold" style={{ color: classificationColor[email.classification] || "white" }}>{email.classification}</div>
            
      <button onClick={onClose} className="text-white hover:text-slate-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="bg-slate-600 mt-4 p-2 rounded-2xl">
    <div className="text-white text-center py-2 font-medium text-lg border-b-2">{email.subject}</div>
      <div
        className="font-serif overflow-hidden text-white pt-2"
        dangerouslySetInnerHTML={{ __html: email.body }}
      />
    </div>
  </div>
);

export default EmailModal;
