
const DailyBooster = ({ icon, name, onClick, remain_num }:any) => {
  return (
    <div
      onClick={onClick}
      className="rounded-md border border-slate-500 p-4 h-14 flex items-center gap-2 bg-[#2d0a4f]/70"
    >
      {icon}
      <div className="flex flex-col">
        <span className="font-bold text-white text-xs">{name}</span>
        <span>{remain_num}/3</span>
      </div>
    </div>
  );
};

export default DailyBooster;
