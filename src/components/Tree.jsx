import { OrganizationChart } from 'primereact/organizationchart';
import { useState } from 'react';
import { initializeRoot, sortChildren, transformNode } from '../services/tree';
import {TreeNode} from './TreeNode';
import dataJSON from '../mocks/data.json';

export default function Tree() {
  const [treeData, setTreeData] = useState(() => initializeRoot(dataJSON.data.attributes));
  const toggleExpand = (node) => {
    setTreeData((prevTree) => {
      return prevTree.map((rootNode) => expandNode(rootNode, node.label));
    });
  };

  const expandNode = (currentNode, nodeLabel) => {

    if (currentNode.label === nodeLabel) {
      const sortedChildren = sortChildren(currentNode.originalChildren).map(transformNode);
      return {
        ...currentNode,
        expanded: !currentNode.expanded,
        children: currentNode.expanded ? [] : sortedChildren
      };
    }

    return {
      ...currentNode,
      children: currentNode.children.map((child) => expandNode(child, nodeLabel))
    };
  };

  const nodeTemplate = (node) => {
    return (
      <TreeNode node={node} toggleExpand={toggleExpand} />
    );
  };

  return (
      <OrganizationChart value={treeData} nodeTemplate={nodeTemplate} />
  );
}
