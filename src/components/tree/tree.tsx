import React, {useCallback, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TreeNode from "./treeNode";
import {Input} from "../input.tsx";
import {Button} from "../button.tsx";
import { saveAs } from 'file-saver';

export interface TreeNodeData {
  id: number;
  name: string;
  children?: TreeNodeData[];
}

interface TreeProps {
  initialData: TreeNodeData[];
}

const Tree: React.FC<TreeProps> = ({initialData}) => {
  const [treeData, setTreeData] = useState<TreeNodeData[]>(initialData);
  const [newNodeName, setNewNodeName] = useState<string>("");

  const findNodeAndParent = (
    nodes: TreeNodeData[],
    nodeId: number,
    parent: TreeNodeData | null = null,
  ): {node: TreeNodeData; parent: TreeNodeData | null} | null => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return {node, parent};
      }
      if (node.children) {
        const result = findNodeAndParent(node.children, nodeId, node);
        if (result) return result;
      }
    }
    return null;
  };

  const moveNode = useCallback((draggedNodeId: number, targetNodeId: number) => {
    let treeDataCopy = JSON.parse(JSON.stringify(treeData));
    const draggedNodeInfo = findNodeAndParent(treeDataCopy, draggedNodeId);
    const targetNodeInfo = findNodeAndParent(treeDataCopy, targetNodeId);

    if (draggedNodeInfo && targetNodeInfo) {
      const {node: draggedNode, parent: draggedNodeParent} = draggedNodeInfo;
      const {node: targetNode} = targetNodeInfo;

      if (draggedNodeParent) {
        draggedNodeParent.children = draggedNodeParent.children?.filter(
          (child) => child.id !== draggedNodeId,
        );
      } else {
        treeDataCopy = treeDataCopy.filter((node: TreeNodeData) => node.id !== draggedNodeId);
      }

      targetNode.children = targetNode.children || [];
      targetNode.children.push(draggedNode);

      setTreeData(treeDataCopy);
    }
  }, [treeData]);

  const removeNode = useCallback((nodeId: number) => {
    const removeNodeRecursive = (nodes: TreeNodeData[], nodeId: number): TreeNodeData[] => {
      return nodes
        .filter(node => node.id !== nodeId)
        .map(node => ({
          ...node,
          children: node.children ? removeNodeRecursive(node.children, nodeId) : undefined,
        }));
    };

    setTreeData(prevData => removeNodeRecursive(prevData, nodeId));
  }, []);

  const addNode = useCallback((name: string, parentId: number | null = null) => {
    const newId = Math.floor(Math.random() * 10000);
    const newNode: TreeNodeData = {id: newId, name};

    if (parentId === null) {
      setTreeData(prevData => [...prevData, newNode]);
    } else {
      const addNodeRecursive = (nodes: TreeNodeData[], parentId: number): TreeNodeData[] => {
        return nodes.map(node => {
          if (node.id === parentId) {
            node.children = node.children ? [...node.children, newNode] : [newNode];
          } else if (node.children) {
            node.children = addNodeRecursive(node.children, parentId);
          }
          return node;
        });
      };

      setTreeData(prevData => addNodeRecursive(prevData, parentId));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeName(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNodeName.trim()) {
      addNode(newNodeName.trim());
      setNewNodeName("");
    }
  };

  const handleDownloadJson = () => {
    const jsonBlob = new Blob([JSON.stringify(treeData, null, 2)], {type: 'application/json'});
    saveAs(jsonBlob, 'treeData.json');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <form className="flex gap-4 mb-4" onSubmit={handleFormSubmit}>
        <Input
          type="text"
          value={newNodeName}
          onChange={handleInputChange}
          placeholder="Enter node name"
        />
        <Button type="submit">Add new node</Button>
        <Button type="button" onClick={handleDownloadJson}>Download Json</Button>
      </form>

      <div className=''>
        {treeData.map((node) => (
          <TreeNode key={node.id} node={node} moveNode={moveNode} onDelete={removeNode} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Tree;
