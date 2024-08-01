import React, {useCallback, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import TreeNode from "./treeNode";
import {Input} from "../input.tsx";
import {Button} from "../button.tsx";
import {saveAs} from "file-saver";
import {addNodeRecursive, findNodeAndParent, removeNodeRecursive} from "../../utils/treeNodes.ts";
import {cloneDeep} from "lodash";
import {generateRandomId} from "../../utils/randomNumericalId.ts";
import Card from "../card.tsx";

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

  const moveNode = useCallback((draggedNodeId: number, targetNodeId: number) => {
    let treeDataCopy = cloneDeep(treeData);
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
    setTreeData(prevData => removeNodeRecursive(prevData, nodeId));
  }, []);

  const addNode = useCallback((name: string, parentId: number | null = null) => {
    const newId = generateRandomId();
    const newNode: TreeNodeData = {id: newId, name};

    if (parentId === null) {
      setTreeData(prevData => [...prevData, newNode]);
    } else {
      setTreeData(prevData => addNodeRecursive(prevData, parentId, newNode));
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
    const jsonBlob = new Blob([JSON.stringify(treeData, null, 2)], {type: "application/json"});
    saveAs(jsonBlob, "treeData.json");
  };

  return (
    <Card className="w-full max-w-lg min-h-[600px] my-8 p-4 overflow-y-scroll">
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

        <div>
          {treeData.map((node) => (
            <TreeNode key={node.id} node={node} moveNode={moveNode} onDelete={removeNode} />
          ))}
        </div>
      </DndProvider>
    </Card>
  );
};

export default Tree;
