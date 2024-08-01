import React from "react";
import Card from "../components/card.tsx";
import Tree from "../components/tree/tree.tsx";
import {initialData} from "../constants/treeInitialData.ts";


const DraggableTree: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg h-2/3 p-4">
        <Tree initialData={initialData} />
      </Card>
    </div>
  );
};

export default DraggableTree;