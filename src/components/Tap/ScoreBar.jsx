import clsx from "clsx";
import { BsLightningFill } from "react-icons/bs";

const ScoreBar = ({
  incrementSparkNumber,
  maxLimitSpark,
  currentSpark,
  // setCurrentSpark,
}) => {
  // useEffect(() => {
  //   if (currentSpark < maxLimitSpark) {
  //     const interval = setInterval(() => {
  //       setCurrentSpark((prevSpark) => {
  //         const newSpark = prevSpark + incrementSparkNumber;
  //         if (newSpark >= maxLimitSpark) {
  //           clearInterval(interval);
  //           return maxLimitSpark;
  //         }
  //         return newSpark;
  //       });
  //     }, 2000); // Increase every second

  //     return () => clearInterval(interval); // Cleanup interval on component unmount
  //   }
  // }, [currentSpark, maxLimitSpark, incrementSparkNumber, setCurrentSpark]);

  const progressPercentage = (currentSpark / maxLimitSpark) * 100;

  return (
    <div className="flex flex-col gap-1 items-center justify-center w-full xs:px-6 px-2">
      <div className="flex gap-2 justify-center items-center">
        <BsLightningFill color="yellow" />
        <span className="text-white text-2xl">{currentSpark}</span> /{" "}
        {maxLimitSpark}
      </div>
      <div className="w-full h-2 rounded-full bg-white shadow-lg overflow-hidden">
        {/* (progressPercentage < 33 ? 'bg-red-600' : 'bg-green-600') */}
        <div
          className={clsx(
            "h-full overflow-hidden",
            progressPercentage < 33 && "bg-fuchsia-400",
            (progressPercentage >= 33 && progressPercentage < 66) && 'bg-fuchsia-500',
            (progressPercentage >= 66 && progressPercentage < 100) && 'bg-fuchsia-600',
            progressPercentage === 100 && "bg-fuchsia-700",
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
