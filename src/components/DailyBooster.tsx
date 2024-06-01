
const DailyBooster = ({ icon, name, onClick, remain_num }:any) => {
  return (
    <div
      onClick={onClick}
      className="rounded-md border border-slate-500 xs:p-4 p-2 h-14 flex items-center xs:gap-2 gap-1 bg-[#2d0a4f]/70"
    >
      {icon}
      <div className="flex flex-col">
        <span className="font-bold text-white xs:text-xs text-[0.7rem]">{name}</span>
        <span className="xs:text-xs text-[0.7rem]">{remain_num}/3</span>
      </div>
    </div>
  );
};

export default DailyBooster;
