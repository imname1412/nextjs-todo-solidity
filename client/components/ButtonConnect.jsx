
const ButtonConnect = ({ connectWallet }) => {
  return (
    <button
      className="font-bold w-fit p-5 rounded-md bg-amber-200 text-amber-700
      hover:scale-125 transition duration-500 ease-in-out
      "
      onClick={() => connectWallet()}
    >
      Connect Wallet
    </button>
  );
};

export default ButtonConnect;
