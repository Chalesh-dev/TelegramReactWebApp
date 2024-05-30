import "./layoutLoading.css";

const LayoutLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-transparent bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700">
      <span class="loader"></span>
    </div>
  );
};

export default LayoutLoading;
