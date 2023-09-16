export const Loader = () => {
    return (
      <div className="z-50 absolute h-full w-full mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 overflow-hidden">
        <div className="h-screen w-screen flex flex-col justify-center items-center mx-auto">
          <div className="lds-ripple loader text-center"><div></div><div></div></div>
        </div>
      </div>
    );
  };
        
