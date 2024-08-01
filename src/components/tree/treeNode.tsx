import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { Trash2Icon } from 'lucide-react';
import { Button } from '../button.tsx';
import {TreeNodeData} from "./tree.tsx";

export interface TreeNodeProps {
  node: TreeNodeData;
  moveNode: (draggedNodeId: number, targetNodeId: number) => void;
  onDelete: (nodeId: number) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, moveNode, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TREE_NODE',
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [node.id]);

  const dropRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'TREE_NODE',
    drop: (item: { id: number }, monitor: DropTargetMonitor) => {
      if (item.id !== node.id && !monitor.didDrop()) {
        moveNode(item.id, node.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });

  drag(drop(dropRef));

  return (
    <div className="cursor-grab bg-white" ref={dropRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className='group hover:bg-gray-50 px-2 rounded w-full flex justify-between items-center h-10'>
        {node.name}
        <Button variant="link" size="sm" className="group-hover:opacity-100 focus-visible:opacity-100 opacity-0 " onClick={() => onDelete(node.id)}>
          <Trash2Icon className="active:text-red-500 h-5 w-5" />
        </Button>
      </div>

      {node.children && (
        <div className='border-l border-gray-200 ml-3 pl-1'>
          {node.children.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} moveNode={moveNode} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
