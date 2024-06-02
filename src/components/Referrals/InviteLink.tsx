import React, { useRef, useState } from "react";

interface InviteLinkTypes {
  link?: string;
}

const InviteLink = ({ link }: InviteLinkTypes) => {
  const linkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (linkRef.current) {
      const txt = linkRef.current.innerText;
      navigator.clipboard
        .writeText(txt)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy text...");
        });
    }
  };

  return (
    <div className="p-3 rounded-md flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-bold text-2xl">My Invite Link:</h1>
        <button
          className="p-3 rounded-md bg-gradient-to-b from-purple-500 to-purple-800 flex justify-center items-center text-white text-sm"
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="text-gray-600 text-xs" ref={linkRef}>
        {link}
      </div>
    </div>
  );
};

export default InviteLink;
