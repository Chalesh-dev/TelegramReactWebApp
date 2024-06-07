import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

interface LinkContainerTypes {
  src: string;
  name: string;
  href: string;
  key: number;
}

const LinkContainer = ({
  src,
  name,
  href,
  key,
}: LinkContainerTypes) => {
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  return (
    <Link
      to={href}
      key={key}
      className={clsx(
        "flex flex-col gap-2 sm:p-3 p-2 border-[1px] border-slate-400 bg-[#140634] rounded-md items-center w-12",
        pathname === name && "border-[1px] border-[#1F51FF]/70 bg-[#1F51FF]/40"
      )}
    >
      <img src={src} alt={name} />
      <span className="text-xs capitalize">{name}</span>
    </Link>
  );
};

export default LinkContainer;
