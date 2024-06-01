interface ScoreBarCompTypes {
  from?: string;
  via?: string;
  to?: string;
  present_value: number;
  final_value: number;
  values?: boolean;
  padding?: string;
}

const ScoreBarComp = (props: ScoreBarCompTypes) => {
  const from = props.from || "from-fuchsia-300";
  const via = props.via || "via-fuchsia-600";
  const to = props.to || "to-fuchsia-700";
  const progressivePercentage = (props.present_value / props.final_value) * 100;
  return (
    <div
      className={`flex flex-col justify-center items-center w-full ${props.padding}`}
    >
      {props.values && (
        <div className="w-full p-2 flex justify-center items-center">
          {Number(props.present_value).toLocaleString()} /{" "}
          {Number(props.final_value).toLocaleString()}
        </div>
      )}
      <div className="w-full h-2.5 rounded-full bg-gray-300 shadow-lg overflow-hidden flex items-center">
        <div
          className={`bg-gradient-to-r h-[80%] ${from} ${via} ${to} bg-300% animate-gradient h-full overflow-hidden rounded-full`}
          style={{ width: `${progressivePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBarComp;
