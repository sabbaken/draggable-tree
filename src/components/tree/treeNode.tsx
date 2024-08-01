import React from "react";
import {useDrag, useDrop} from "react-dnd";
import {TreeNodeData} from "./tree.tsx";
import {Trash2Icon} from "lucide-react";
import {Button} from "../button.tsx";

interface TreeNodeProps {
  node: TreeNodeData;
  onDelete: (nodeId: number) => void;
  moveNode: (draggedNodeId: number, targetNodeId: number) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({node, onDelete, moveNode}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "TREE_NODE",
    item: {id: node.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [node.id]);

  const [, drop] = useDrop(() => ({
    accept: "TREE_NODE",
    drop: (item: {id: number}) => {
      if (item.id !== node.id) {
        moveNode(item.id, node.id);
      }
    },
  }), [node.id, moveNode]);

  return (
    <div className="cursor-grab" ref={(instance) => drag(drop(instance))} style={{opacity: isDragging ? 0.5 : 1}}>
      <div className='group hover:bg-gray-50 px-2 rounded w-full flex justify-between items-center h-10'>
        {node.name}
        <Button variant="link" size="sm" className="group-hover:opacity-100 focus-visible:opacity-100 opacity-0 " onClick={() => onDelete(node.id)}>
          <Trash2Icon className="active:text-red-500 h-5 w-5"/>
        </Button>
      </div>

      {node.children && (
        <div className='border-l border-gray-200 ml-1 pl-3' >
          {node.children.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} moveNode={moveNode} onDelete={onDelete}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
