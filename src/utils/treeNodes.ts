import {TreeNodeData} from "../components/tree/tree.tsx";

export const findNodeAndParent = (
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

export const removeNodeRecursive = (nodes: TreeNodeData[], nodeId: number): TreeNodeData[] => {
  return nodes
    .filter(node => node.id !== nodeId)
    .map(node => ({
      ...node,
      children: node.children ? removeNodeRecursive(node.children, nodeId) : undefined,
    }));
};

export const addNodeRecursive = (nodes: TreeNodeData[], parentId: number, newNode: TreeNodeData): TreeNodeData[] => {
  return nodes.map(node => {
    if (node.id === parentId) {
      node.children = node.children ? [...node.children, newNode] : [newNode];
    } else if (node.children) {
      node.children = addNodeRecursive(node.children, parentId, newNode);
    }
    return node;
  });
};