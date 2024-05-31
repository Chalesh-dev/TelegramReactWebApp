interface StatsProps {
  description?: string;
  total?: number;
}

const Stats = ({ description, total }: StatsProps) => {
  return (
    <div className="my-2 flex flex-col gap-1 justify-center items-center">
      <span className="text-sm text-gray-200">{description}</span>
      {total ? (
        <h1 className="text-white text-2xl">
          {Number(total).toLocaleString()}
        </h1>
      ) : (
        <h1 className="text-white text-2xl">0</h1>
      )}
    </div>
  );
};

export default Stats;
