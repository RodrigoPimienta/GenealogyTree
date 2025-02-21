import { OrganizationChart } from 'primereact/organizationchart';
import { useState } from 'react';
import { initializeRoot, sortChildren, transformNode } from '../services/tree';
import {TreeNode} from './TreeNode';
import dataJSON from '../../public/data.json';

export default function Tree() {
  const [treeData, setTreeData] = useState(() => initializeRoot(dataJSON.data.attributes));
  // Función para manejar la expansión de un nodo
  const toggleExpand = (node) => {
    setTreeData((prevTree) => {
      return prevTree.map((rootNode) => expandNode(rootNode, node.label));
    });
  };

  // Expande o colapsa un nodo dinámicamente
  const expandNode = (currentNode, nodeLabel) => {

    if (currentNode.label === nodeLabel) {
      // Cargamos los hijos ordenados
      const sortedChildren = sortChildren(currentNode.originalChildren).map(transformNode);
      return {
        ...currentNode,
        expanded: !currentNode.expanded,
        children: currentNode.expanded ? [] : sortedChildren
      };
    }

    // Aplicar la expansión/contracción recursivamente en los hijos
    return {
      ...currentNode,
      children: currentNode.children.map((child) => expandNode(child, nodeLabel))
    };
  };

  // Template del nodo
  const nodeTemplate = (node) => {
    return (
      <TreeNode node={node} toggleExpand={toggleExpand} />
    );
  };

  return (
      <OrganizationChart value={treeData} nodeTemplate={nodeTemplate} />
  );
}
