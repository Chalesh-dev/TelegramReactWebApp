
const CardLoading = () => {
  return (
    <div className="w-full p-2.5 rounded-md bg-slate-900 flex items-center justify-between my-1 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-[30px] h-[30px] bg-gray-400 rounded-md" />
        <div className="flex flex-col justify-evenly gap-3">
          <div className="w-20 h-3 bg-gray-400 rounded-md" />
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 items-center justify-center">
              <img src="./images/coin.png" alt="coin" className="w-4 h-4" />
              <div className="w-12 h-3 bg-gray-400 rounded-md" />
              |
              <div className="w-12 h-3 bg-gray-400 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
