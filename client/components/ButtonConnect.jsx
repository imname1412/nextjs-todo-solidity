import React from "react";

const ButtonConnect = ({ setIsConnected }) => {
  return (
    <button
      className="font-bold w-fit p-5 rounded-md bg-amber-200 text-amber-700"
      onClick={() => setIsConnected(true)}
    >
      Connect Wallet
    </button>
  );
};

export default ButtonConnect;
