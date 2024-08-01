import React from "react";
import Tree from "../components/tree/tree.tsx";
import {initialData} from "../constants/treeInitialData.ts";


const DraggableTree: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Tree initialData={initialData} />
    </div>
  );
};

export default DraggableTree;