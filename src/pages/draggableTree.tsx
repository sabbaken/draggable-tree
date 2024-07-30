import React from "react";
import Toolbar from "../components/toolbar.tsx";

const DraggableTree: React.FC = () => {

  return (
    <>
      <Toolbar />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        draggable tree
      </div>
    </>
  );
};

export default DraggableTree;