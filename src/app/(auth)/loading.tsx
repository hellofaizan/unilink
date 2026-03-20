import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full bg-background z-20 min-h-dvh md:min-h-screen">
      <Loader className="animate-spin w-10 h-10" />
    </div>
  );
};

export default Loading;
